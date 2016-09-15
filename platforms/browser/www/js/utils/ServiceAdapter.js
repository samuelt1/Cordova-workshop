window.ServiceAdapter = {
  serviceCall: function (method, url, successCallback, errorCallback) {
    var info;

    info = {
      method: method,
      server: Config.SERVER,
      url: url
    };

    $.ajax({
      type: info.method,
      url: info.server + info.url,
      crossDomain: true,
      success: function (data, status, request) {
        console.log('Service call successful: ' + info.method + ' ' + info.url);
        if (successCallback) {
          successCallback(data, status, request);
        }
      },
      error: function (data) {
        SpinAdapter.hide();
        console.log('Service call encountered an error: ' + JSON.stringify(info) + '--' + JSON.stringify(data));
        if (errorCallback) {
          errorCallback();
        }
      }
    });
  },
  getCareProviderRoles: function (successCallback) {
    var etag;

    this.serviceCall('GET', '/api/team/care_provider_roles.json',
            function (data, status, request) {
              etag = request.getResponseHeader('Etag');
              if (successCallback) {
                successCallback(data, etag);
              }
            });
  },
  getConditions: function (successCallback) {
    var etag;

    this.serviceCall('GET', '/api/conditions.json',
            function (data, status, request) {
              etag = request.getResponseHeader('Etag');
              if (successCallback) {
                successCallback(data, etag);
              }
            });
  },
  getCoordinators: function (successCallback) {
    var etag;

    this.serviceCall('GET', '/api/team/coordinators.json',
            function (data, status, request) {
              etag = request.getResponseHeader('Etag');
              if (successCallback) {
                successCallback(data, etag);
              }
            });
  },
  getStaff: function (successCallback) {
    var etag;

    this.serviceCall('GET', '/api/team/clinic_staffs.json',
            function (data, status, request) {
              etag = request.getResponseHeader('Etag');
              if (successCallback) {
                successCallback(data, etag);
              }
            });
  },
  getDashboardModules: function (successCallback) {
    var etag;

    this.serviceCall('GET', '/api/dashboard/body_modules.json',
            function (data, status, request) {
              etag = request.getResponseHeader('Etag');
              if (successCallback) {
                successCallback(data, etag);
              }
            });
  },
  getDashboardImage: function (id, successCallback) {
    this.serviceCall('GET', '/api/dashboard/body_modules/' + id + '.json',
            function (data, status, request) {
              if (successCallback) {
                successCallback(data);
              }
            });
  },
  getDoctors: function (successCallback) {
    var etag;

    this.serviceCall('GET', '/api/team/doctors.json',
            function (data, status, request) {
              etag = request.getResponseHeader('Etag');
              if (successCallback) {
                successCallback(data, etag);
              }
            });
  },
  getDoctor: function (id, successCallback) {
    this.serviceCall('GET', '/api/team/doctors/' + id + '.json', function (data, status, request) {
      if (successCallback) {
        successCallback(data);
      }
    });
  },
  getResidents: function (successCallback) {
    var etag;

    this.serviceCall('GET', '/api/team/residents.json',
            function (data, status, request) {
              etag = request.getResponseHeader('Etag');
              if (successCallback) {
                successCallback(data, etag);
              }
            });
  },
  getResident: function (id, successCallback) {
    this.serviceCall('GET', '/api/team/residents/' + id + '.json', function (data, status, request) {
      if (successCallback) {
        successCallback(data);
      }
    });
  },
  getTimelines: function (successCallback) {
    var etag;

    this.serviceCall('GET', '/api/timelines.json',
            function (data, status, request) {
              etag = request.getResponseHeader('Etag');
              if (successCallback) {
                successCallback(data, etag);
              }
            });
  },
  getTimelineEvents: function (timeline_info, successCallback) {
    var etag;

    this.serviceCall('GET', '/api/timelines/' + timeline_info.id + '/events.json',
            function (data, status, request) {
              etag = request.getResponseHeader('Etag');
              if (successCallback) {
                successCallback(timeline_info.id, data, etag);
              }
            });
  },
  getLocationCategories: function (successCallback) {
    var etag;

    this.serviceCall('GET', '/api/locations/categories.json',
            function (data, status, request) {
              etag = request.getResponseHeader('Etag');
              if (successCallback) {
                successCallback(data, etag);
              }
            });
  },
  getLocationsByCategory: function (location, category_list, successCallback) {
    var location,
            service,
            request,
            locationCategory,
            category,
            keywords;

    locationCategory = new LocationCategories();
    category = locationCategory.getCategory(category_list);
    keyword = typeof (category) !== 'undefined' ? category.keyword : '';

    if (google && google.maps) {
      service = new google.maps.places.PlacesService(document.createElement('div'));
      request = {
        location: new google.maps.LatLng(location.latitude, location.longitude),
        radius: 804.672, // 804.672m ~ 5 mile radius
        keyword: keyword
      };

      service.nearbySearch(request, function (results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          if (successCallback) {
            successCallback(results);
          }
        }
      });
    } else {
      console.log('google.maps is not supported.');
    }
  },
  getLocationDetails: function (place_id, successCallback) {
    var service,
            request;

    if (google && google.maps) {
      service = new google.maps.places.PlacesService(document.createElement('div'));
      request = {placeId: place_id};

      service.getDetails(request, function (results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          if (successCallback) {
            successCallback(results);
          }
        }
      });
    } else {
      console.log('google.maps is not supported.');
    }
  },
  getReminderEvents: function (r_id, successCallback) {
    var etag;

    this.serviceCall('GET', '/api/reminders/' + r_id + '/events.json',
            function (data, status, request) {
              etag = request.getResponseHeader('Etag');
              if (successCallback) {
                successCallback(data, etag);
              }
            });
  },
  getServices: function (successCallback) {
    var etag;

    this.serviceCall('GET', '/api/services.json',
            function (data, status, request) {
              etag = request.getResponseHeader('Etag');
              if (successCallback) {
                successCallback(data, etag);
              }
            });
  },

};