# Generated by Django 4.1 on 2023-03-14 19:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('assets', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='extrato',
            name='rentabilidade',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=11),
        ),
    ]
