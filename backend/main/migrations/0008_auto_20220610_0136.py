# Generated by Django 3.2.9 on 2022-06-09 18:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0007_auto_20220608_2201'),
    ]

    operations = [
        migrations.AddField(
            model_name='advertisement',
            name='district',
            field=models.CharField(default='', max_length=20, verbose_name='Район'),
        ),
        migrations.AddField(
            model_name='advertisement',
            name='repair',
            field=models.CharField(default='', max_length=20, verbose_name='Ремонт'),
        ),
    ]