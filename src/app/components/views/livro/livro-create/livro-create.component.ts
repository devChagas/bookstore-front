import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-create',
  templateUrl: './livro-create.component.html',
  styleUrls: ['./livro-create.component.css']
})
export class LivroCreateComponent implements OnInit {

  id_cat: String = '';

  livro: Livro = {
    id: '',
    titulo: '',
    nomeAutor: '',
    texto: ''
  }

  titulo = new FormControl('', [Validators.minLength(3)]);
  nome_autor = new FormControl('', [Validators.minLength(3)]);
  texto = new FormControl('', [Validators.minLength(10)]);

  constructor(private service: LivroService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get('id_cat')!;
    this.create();
  }

  create(): void {
    this.service.create(this.livro, this.id_cat).subscribe(resposta => {
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
      this.service.mensagem('Livro criado com sucesso!');
    }, err => {
      console.log(err);
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
      this.service.mensagem('Erro ao criar novo Livro! Tente novamente mais tarde');
   });
  } 

  cancel(): void {
    this.router.navigate([`categorias/${this.id_cat}/livros`]); 
  }

  getMessage() {
    if(this.titulo.invalid){
      return 'O Campo Título deve conter entre 3 e 100 caracteres';
    }
    if(this.nome_autor.invalid){
      return 'O Campo Nome do Autor deve conter entre 3 e 100 caracteres';
    }
    if(this.texto.invalid){
      return 'O Campo Texto deve conter entre 10 e 2.000.000 caracteres';
    }
    return false;
  }

}
