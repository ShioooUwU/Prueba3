import { Component } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Router } from '@angular/router';

import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.page.html',
  styleUrls: ['./servicios.page.scss'],
})
export class ServiciosPage {

  scannedResult: any;
  content_visibility = '';

  constructor(private router: Router, private alertController: AlertController) {}

  async logOut() {
    const alert = await this.alertController.create({
      header: 'Cerrar Sesión',
      message: '¿Estás seguro de que quieres cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Cerrar Sesión',
          handler: () => {
            // Borra la variable 'autenticado' del localStorage
            localStorage.removeItem('autenticado');

            // Redirige a la página de inicio de sesión
            this.router.navigate(['/ingreso']);
          },
        },
      ],
    });

    await alert.present();
  }

  async startScan() {
    try {
      // Asegúrate de que los permisos están habilitados
      const status = await BarcodeScanner.checkPermission({ force: true });
  
      if (status.granted) {
        // Oculta el fondo y realiza el escaneo
        await BarcodeScanner.hideBackground();
        const result = await BarcodeScanner.startScan();
  
        // Verifica si el escaneo tiene contenido
        if (result.hasContent) {
          this.scannedResult = result.content;
          this.openLink(); // Llama a la función para abrir el enlace
        } else {
          console.warn('No se detectó contenido en el escaneo.');
        }
      } else {
        console.warn('Permisos de cámara no concedidos.');
      }
    } catch (error) {
      console.error('Error al iniciar el escaneo:', error);
    }
  }
  
  openLink() {
    try {
      if (this.scannedResult.startsWith('http') || this.scannedResult.startsWith('https')) {
        window.open(this.scannedResult, '_blank');
      } else {
        console.warn('El resultado del escaneo no es una URL válida.');
      }
    } catch (error) {
      console.error('Error al abrir el enlace:', error);
    }
  }
}
