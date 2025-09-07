from psycopg import DatabaseError
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from api.permissions import IsAdminOrReadOnly
from api.product.serializers import ProductCreateSerializer, ProductSerializer
from api.product.services import ProductService


from rest_framework.generics import ListCreateAPIView


# Create your views here.
class ProductListView(ListCreateAPIView):
    """
    A viewset for viewing and editing product instances.
    """

    permission_classes = [IsAdminOrReadOnly]
    http_method_names = ["get", "post"]
    serializer_class = ProductSerializer

    def get(self, request):
        try:
            products = ProductService.get_all_products()
            if not products:
                return Response({"message": "No products found."}, status=204)
            serializer = self.serializer_class(products, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except DatabaseError as e:
            return Response(
                {"error": "Database error occurred", "details": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
        except Exception as e:
            return Response(
                {"error": "An unexpected error occurred", "details": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def post(self, request):
        # print('Product object',request.body)
        print(request.POST)  # Django’s parsed form data (only text fields)
        print(request.FILES)
        serializer = ProductCreateSerializer(
            data=request.data, context={"request": request}
        )
        if serializer.is_valid():
            product = ProductService.add_product(
                user=request.user,
                validated_data=serializer.validated_data,
                files=request.FILES,
            )
            if product:
                return Response(
                    self.serializer_class(product).data, status=status.HTTP_201_CREATED
                )
            else:
                return Response(
                    {"detail": "Failed to create product."},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProductDetailView(APIView):
    permission_classes = [IsAdminOrReadOnly]
    http_method_names = ["get", "put", "patch", "delete"]
    serializer_class = ProductSerializer

    def get(self, request, pk):
        product = ProductService.get_product_detail(pk)
        if product is None:
            Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

        return Response(ProductSerializer(product).data, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        product = ProductService.get_product_detail(pk)
        if product is None:
            return Response(
                {"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND
            )
        ProductService.delete_product(product)
        return Response(
            {"msg": f"Product {pk} successfully deleted"},
            status=status.HTTP_204_NO_CONTENT,
        )

    def patch(self, request, pk):
        product = ProductService.get_product_detail(pk)
        if product is None:
            return Response(
                {"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND
            )
        serializer = self.serializer_class(product, data=request.data, partial=True)
        if serializer.is_valid():
            updated_product = ProductService.update_product(
                product, serializer.validated_data
            )
            return Response(
                self.serializer_class(updated_product).data, status=status.HTTP_200_OK
            )
        return Response(serializer.errors, status=status.HTTP_400_NOT_FOUND)

    def put(self, request, pk):
        product = ProductService.get_product_detail(pk)
        if product is None:
            return Response(
                {"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND
            )
        serializer = self.serializer_class(product, data=request.data)
        if serializer.is_valid():
            updated_product = ProductService.update_product(
                product, serializer.validated_data
            )
            return Response(
                self.serializer_class(updated_product).data,
                status=status.HTTP_200_NOT_FOUND,
            )
        return Response(serializer.errors, status=status.HTTP_400_NOT_FOUND)
