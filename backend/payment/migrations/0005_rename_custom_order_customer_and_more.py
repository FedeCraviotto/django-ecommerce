# Generated by Django 4.1.7 on 2023-02-23 08:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('payment', '0004_order'),
    ]

    operations = [
        migrations.RenameField(
            model_name='order',
            old_name='custom',
            new_name='customer',
        ),
        migrations.RenameField(
            model_name='paymentmethod',
            old_name='custom',
            new_name='customer',
        ),
    ]
