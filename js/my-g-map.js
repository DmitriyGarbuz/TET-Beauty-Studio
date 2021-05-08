var map;
    $(document).ready(function(){
      map = new GMaps({
        el: '#map',
        lat: 50,
        lng: 31.33,
        zoom: 6,
      });
      map.addMarker({
        lat: 50.449707,
        lng: 30.505129,
        title: 'Киев',
        infoWindow: {
          content: '<h5>ул. Чапаева 16</h5>'
        }
      });
      map.addMarker({
        lat: 49.069074,
        lng: 33.411325,
        title: 'Кременчуг',
        infoWindow: {
          content: '<p>ул. Пролетарская 27-б</p>'
        },
      });
      map.addMarker({
        lat: 49.068078,
        lng: 33.417038,
        title: 'Кременчуг',
        infoWindow: {
          content: '<p>ул. Ленина 32-29</p>'
        }
      });
      map.addMarker({
        lat: 49.016380,
        lng: 33.628070,
        title: 'Комсомольск',
        infoWindow: {
          content: '<p>ул. Добровольского 63</p>'
        }
      });

      $('#geocoding_form').submit(function(e){
        e.preventDefault();
        GMaps.geocode({
          address: $('#address').val().trim(),
          callback: function(results, status){
            if(status=='OK'){
              var latlng = results[0].geometry.location;
              map.setCenter(latlng.lat(), latlng.lng());
              map.addMarker({
                lat: latlng.lat(),
                lng: latlng.lng()
              });
            }
          }
        });
      });
      map.addControl({
        position: 'top_right',
        content: 'Геолокация',
      style: {
        margin: '5px',
        padding: '1px 6px',
        border: 'solid 1px #ссс',
        background: '#fff',
        color: '#dd1111'
      },
      events: {
         click: function(){
            GMaps.geolocate({
              success: function(position){
                map.setCenter(position.coords.latitude, position.coords.longitude);
              },
              error: function(error){
                alert('Поиск не удался, повторите снова: ' + error.message);
              },
              not_supported: function(){
                alert("Ваш браузер не потдерживает геолокацию");
              }
            });
          }
        }
      });
    });
