import { Component } from '@angular/core';
import { EventosService } from './app.service';
import * as _ from 'underscore';
import * as moment from 'moment';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'dito-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dito-frontend';
  evCompra = [];
  constructor(private eventos: EventosService, private iconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.iconRegistry.addSvgIcon(
      'icon_check',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/check.svg')
    );
    this.iconRegistry.addSvgIcon(
      'icon_calendar',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/calendar.svg')
    );
    this.iconRegistry.addSvgIcon(
      'icon_clock',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/clock.svg')
    );
    this.iconRegistry.addSvgIcon(
      'icon_money',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/money.svg')
    );
    this.iconRegistry.addSvgIcon(
      'icon_place',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/place.svg')
    );
  }

  tratarDados(eventos) {
    var eventosCompra = [];
    var compra = [];
    if (eventos.length) {
      eventosCompra = _.filter(eventos, function (ev: any) {
        return ev.event === 'comprou';
      });

      _.each(eventosCompra, function (c: any) {

        var data = moment(c.timestamp).format('DD/MM/YYYY');
        var hora = moment(c.timestamp).format('HH:mm');
        var total = c.revenue;

        var local = _.filter(c.custom_data, function (cd: any) {
          return cd.key === 'store_name';
        })[0].value;

        var id = _.filter(c.custom_data, function (cd: any) {
          return cd.key === 'transaction_id';
        })[0].value;

        var produtos = [];
        _.each(eventos, function (ev: any) {
          if (ev.event === 'comprou-produto' && _.filter(ev.custom_data, function (cd: any) {
            return cd.key === 'transaction_id' && cd.value === id;
          }).length) {
            produtos.push({
              nome: _.filter(ev.custom_data, function (cd: any) {
                return cd.key === 'product_name';
              })[0].value,
              preco: _.filter(ev.custom_data, function (cd: any) {
                return cd.key === 'product_price';
              })[0].value
            });
          }
        });

        compra.push({
          id: id,
          data: data,
          hora: hora,
          total: total,
          local: local,
          produtos: produtos
        });

      });
    }
    this.evCompra = compra;
  }

  erroDados(err) {
    alert('Erro ao consumir serviço de eventos');
  }

  ngOnInit() {
    this.eventos.listarEventos().subscribe(
      listaEventos => this.tratarDados(listaEventos.events),
      err => this.erroDados(err)
    );
  }
}
