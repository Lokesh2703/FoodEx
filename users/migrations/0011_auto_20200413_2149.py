# Generated by Django 3.0.3 on 2020-04-13 21:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0010_auto_20200413_2136'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customerreviews',
            name='ratings',
            field=models.IntegerField(choices=[(20, 1), (40, 2), (60, 3), (80, 4), (100, 5)], default=1),
        ),
    ]
