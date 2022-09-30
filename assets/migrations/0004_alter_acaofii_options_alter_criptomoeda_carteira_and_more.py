# Generated by Django 4.1 on 2022-09-23 19:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('assets', '0003_alter_carteira_valor_total_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='acaofii',
            options={'verbose_name': 'Ação e FII', 'verbose_name_plural': 'Ações e FIIs'},
        ),
        migrations.AlterField(
            model_name='criptomoeda',
            name='carteira',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='criptomoeda', to='assets.carteira'),
        ),
        migrations.AlterField(
            model_name='criptomoeda',
            name='unidades',
            field=models.DecimalField(decimal_places=10, max_digits=13),
        ),
    ]