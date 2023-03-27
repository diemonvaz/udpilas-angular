import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Jugador } from 'src/app/models/Jugador';
import { EquiposService } from 'src/app/services/equipos.service';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})
export class EquiposComponent implements OnInit {

  constructor(private equiposService: EquiposService,  private route: ActivatedRoute) { }

   ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.equiposService.getEquipos().subscribe(data => {
        this.equipo = params.get("nombre");
        this.porteros = data.filter(equipo => equipo.nombre === params.get("nombre"))[0].jugadores.filter(jugador => jugador.posicion == "Portero");
        this.defensores = data.filter(equipo => equipo.nombre === params.get("nombre"))[0].jugadores.filter(jugador => jugador.posicion == "Defensa");      
        this.centrocampistas = data.filter(equipo => equipo.nombre === params.get("nombre"))[0].jugadores.filter(jugador => jugador.posicion == "Central" || jugador.posicion == "Lateral Izquierdo" || jugador.posicion == "Lateral Derecho");      
        this.delanteros = data.filter(equipo => equipo.nombre === params.get("nombre"))[0].jugadores.filter(jugador => jugador.posicion == "Delantero");      
      })
    });
    
  }

  equipo: String;
  jugadoresArray: Jugador[] = [];
  porteros: Jugador[] = [];
  defensores: Jugador[] = [];
  centrocampistas: Jugador[] = [];
  delanteros: Jugador[] = [];
}
