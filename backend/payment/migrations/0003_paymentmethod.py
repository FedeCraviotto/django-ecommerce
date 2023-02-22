# Generated by Django 4.1.7 on 2023-02-22 10:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('payment', '0002_address'),
    ]

    operations = [
        migrations.CreateModel(
            name='PaymentMethod',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('token', models.CharField(max_length=36, unique=True)),
                ('billing_address', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='payment.address')),
                ('custom', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='payment.customer')),
            ],
        ),
    ]
