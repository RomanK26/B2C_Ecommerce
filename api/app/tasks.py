import time
from celery import shared_task

@shared_task
def add(x,y):
    i=0
    while(i<5):
        time.sleep(1)
        print('processing..')
        i+=1
    return x+y

@shared_task
def clear_session_cache(id):
    print(f"session cache cleared {id}")
    return id
    