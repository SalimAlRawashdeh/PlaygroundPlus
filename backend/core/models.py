from django.db import models

class storePrompts(models.Model):
    # objects = None
    prompt = models.TextField()
    model_ids = models.JSONField()
    response = models.JSONField()
    timestamp = models.DateTimeField(auto_now_add=True)
