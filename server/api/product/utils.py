def product_image_path(instance, filename):
    """To save product image"""
    return f"product/{instance.product}/{filename}"