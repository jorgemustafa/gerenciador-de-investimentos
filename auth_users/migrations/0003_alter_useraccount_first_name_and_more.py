# Generated by Django 4.1 on 2022-09-14 17:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auth_users', '0002_remove_useraccount_name_useraccount_first_name_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='useraccount',
            name='first_name',
            field=models.CharField(default='default', max_length=255),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='useraccount',
            name='last_name',
            field=models.CharField(default='default_last_name', max_length=255),
            preserve_default=False,
        ),
    ]
