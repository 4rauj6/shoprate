function abrir_musica_page() {
  document.getElementById("musicas_page").style.display = "block";
  document.getElementById("homepage").style.display = "none";
  document.getElementById("albuns_page").style.display = "none";
  document.getElementById("about_page").style.display = "none";
  document.getElementById("cadastro_page").style.display = "none";
}

function abrir_albuns_page() {
   document.getElementById("albuns_page").style.display = "block";
   document.getElementById("musicas_page").style.display = "none";
   document.getElementById("homepage").style.display = "none";
   document.getElementById("about_page").style.display = "none";
   document.getElementById("cadastro_page").style.display = "none";
}

function abrir_about_page() {
  document.getElementById("musicas_page").style.display = "none";
  document.getElementById("homepage").style.display = "none";
  document.getElementById("albuns_page").style.display = "none";
  document.getElementById("about_page").style.display = "block";
}

function abrir_cadastro_page() {
   document.getElementById("cadastro_page").style.display = "block";
   document.getElementById("homepage").style.display = "none";
   document.getElementById("about_page").style.display = "none";
   document.getElementById("albuns_page").style.display = "none";
   document.getElementById("musicas_page").style.display = "none";
}