import { TestBed } from '@angular/core/testing';
import { NoticiasService } from './noticias.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Noticia } from '../models/Noticia';
import { of } from 'rxjs';
import { NoticiaRequest } from '../models/NoticiaRequest';

describe('NoticiasService', () => {
  let service: NoticiasService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    http = TestBed.inject(HttpClient);
    service = TestBed.inject(NoticiasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should add a new Noticia', () => {
    const nuevaNoticia: Noticia = {tituloNoticia: "Test", contenidoNoticia: "test", usuario: "test", fechaCreacion: "test", 
              fechaPublicacion: "test", esPortada: false, urlImagen: "test"};
    spyOn(http, 'post').and.returnValue(of(nuevaNoticia));
  
    service.addNoticia(nuevaNoticia).subscribe((noticia) => {
      expect(noticia).toEqual(nuevaNoticia);
    });
  });

  it('should return an array of NoticiaRequest', () => {
    const noticia: NoticiaRequest = {
      tituloNoticia: "Test", contenidoNoticia: "test", usuario: "test", fechaCreacion: "test",
      fechaPublicacion: "test", esPortada: false,
      idnoticias: undefined,
      imagen: undefined,
      etiquetas: []
    };
    const dummyNoticias: NoticiaRequest[] = [noticia];

    spyOn(http, 'get').and.returnValue(of(dummyNoticias));
    service.getNoticias().subscribe((noticias) => {
      expect(noticias).toEqual(dummyNoticias);
    });
  });

  it('should return an array of NoticiaRequest', () => {
    const noticia: NoticiaRequest = {
      tituloNoticia: "Test", contenidoNoticia: "test", usuario: "test", fechaCreacion: "test",
      fechaPublicacion: "test", esPortada: false,
      idnoticias: undefined,
      imagen: undefined,
      etiquetas: []
    };
    const dummyNoticias: NoticiaRequest[] = [noticia];

    spyOn(http, 'get').and.returnValue(of(dummyNoticias));
    service.getNoticiasAfterDate().subscribe((noticias) => {
      expect(noticias).toEqual(dummyNoticias);
    });
  });

  it('should return a NoticiaRequest', () => {
    const noticia: NoticiaRequest = {
      tituloNoticia: "Test", contenidoNoticia: "test", usuario: "test", fechaCreacion: "test",
      fechaPublicacion: "test", esPortada: false,
      idnoticias: undefined,
      imagen: undefined,
      etiquetas: []
    };

    spyOn(http, 'get').and.returnValue(of(noticia));
    service.getNoticiaById("id").subscribe((noticia) => {
      expect(noticia).toEqual(noticia);
    });
  });

  it('should return a NoticiaRequest', () => {
    const noticia: NoticiaRequest = {
      tituloNoticia: "Test", contenidoNoticia: "test", usuario: "test", fechaCreacion: "test",
      fechaPublicacion: "test", esPortada: false,
      idnoticias: undefined,
      imagen: undefined,
      etiquetas: []
    };

    spyOn(http, 'get').and.returnValue(of(noticia));
    service.getNoticiaByTitulo("tituloNoticia").subscribe((noticia) => {
      expect(noticia).toEqual(noticia);
    });
  });

  it('should return a NoticiaRequest', () => {
    const noticia: NoticiaRequest = {
      tituloNoticia: "Test", contenidoNoticia: "test", usuario: "test", fechaCreacion: "test",
      fechaPublicacion: "test", esPortada: false,
      idnoticias: undefined,
      imagen: undefined,
      etiquetas: []
    };

    spyOn(http, 'get').and.returnValue(of(noticia));
    service.getNoticiaByEtiqueta("etiqueta").subscribe((noticia) => {
      expect(noticia).toEqual(noticia);
    });
  });

  it('should return a NoticiaRequest', () => {
    const noticia: NoticiaRequest = {
      tituloNoticia: "Test", contenidoNoticia: "test", usuario: "test", fechaCreacion: "test",
      fechaPublicacion: "test", esPortada: false,
      idnoticias: undefined,
      imagen: undefined,
      etiquetas: []
    };

    spyOn(http, 'get').and.returnValue(of(noticia));
    service.getUltimasInsertadas(3).subscribe((noticia) => {
      expect(noticia).toEqual(noticia);
    });
  });

  
  it('should update a Noticia', () => {
    const noticiaActualizada: Noticia = {
      tituloNoticia: "Test", contenidoNoticia: "test", usuario: "test", fechaCreacion: "test",
      fechaPublicacion: "test",
      esPortada: false,
      urlImagen: undefined
    };

    spyOn(http, 'put').and.returnValue(of(noticiaActualizada));
  
    service.updateById(noticiaActualizada, "0").subscribe((noticia) => {
      expect(noticia).toEqual(noticiaActualizada);
    });
  });


  it('should delete a Noticia', () => {
    const noticia: Noticia = {
      tituloNoticia: "Test", contenidoNoticia: "test", usuario: "test", fechaCreacion: "test",
      fechaPublicacion: "test",
      esPortada: false,
      urlImagen: undefined
    };
    const idNoticiaAEliminar: String = "1";

    spyOn(http, 'delete').and.returnValue(of(noticia));
  
    service.deleteById(idNoticiaAEliminar).subscribe((noticia) => {
      expect(noticia).toEqual(noticia);
    });
  });


});
