# Generated by Django 3.0.8 on 2020-12-08 18:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sentry', '0002_missing_sighting'),
    ]

    operations = [
        migrations.AlterField(
            model_name='missing',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='media/'),
        ),
        migrations.AlterField(
            model_name='sighting',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='media/'),
        ),
    ]