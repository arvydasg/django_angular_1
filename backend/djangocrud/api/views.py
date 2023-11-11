from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.response import Response
from .serializers import MovieMiniSerializer, MovieSerializer
from .models import Movie


"""
    We provide a more detailed representation of a single movie when it's requested 
    individually(upon click), and a more concise(less heavy) representation for a list 
    of movies(when we load a list of them in the front page), which can be more efficient.

    Within a single view class, we can specify different serializers for different actions 
    (list, retrieve, create, etc.) by overriding the get_serializer_class method.

    For actions like retrieving a single movie (retrieve), creating, updating, and deleting, 
    it uses the MovieSerializer.

    For the list action (listing multiple movies), it uses the custom MovieMiniSerializer 
    that we've specified within the list method. In our case this is used when we load ALL
    of the movies in the homepage. We want to optimize the API responses
"""

class MovieViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows movies to be viewed or edited.
    """
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer # Used as the default serializer for this view

    def list(self, request, *args, **kwargs):
        """We are using a build in list function instead, we say that we don't want to use
        the default MovieViewSet, but our custom one instead."""
        movies = Movie.objects.all()
        serializer = MovieMiniSerializer(movies, many=True)
        return Response(serializer.data)