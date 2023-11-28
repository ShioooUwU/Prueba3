import { Component } from '@angular/core';
import { Share } from '@capacitor/share';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: '/inicio', icon: 'home' },
    { title: 'Restablecer contraseña', url: '/contacto', icon: 'mail' },
    { title: 'Servicios', url: '/servicios', icon: 'paper-plane' },
    { title: 'Iniciar Sesion', url: '/ingreso', icon: 'person' },
    { title: 'Registrarse', url: '/registro', icon:'person'  },
    { title : 'Mapa', url: '/map', icon: 'map'    },
    
  ];
  constructor() {}

  compartirApp() {
    Share.share({
      title: 'Compartir myApp',
      url: 'https://bilbaolabs.cl/',
      dialogTitle: 'Es perfecta! ',
    });
  }
}
