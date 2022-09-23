# Generated by Django 4.1 on 2022-09-22 22:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('assets', '0002_remove_propriedade_descricao_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='carteira',
            name='valor_total',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=20),
        ),
        migrations.AlterField(
            model_name='criptomoeda',
            name='unidades',
            field=models.DecimalField(decimal_places=2, max_digits=11),
        ),
    ]
