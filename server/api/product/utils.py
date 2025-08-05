def product_image_path(instance, filename):
    """To save product image"""
    return f"product/images/{instance.product}/{filename}"