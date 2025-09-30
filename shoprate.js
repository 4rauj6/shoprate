function slide_page(pages_id){
   document.querySelectorAll(".pages").forEach(pages => {
      pages.style.display = "none";
   });
   document.getElementById(pages_id).style.display = "block";
   
   if(pages_id === "homepage" || pages_id === "perfil_page" || pages_id === "make_post_page" || pages_id === "post_page"){
      document.getElementById("navbar").style.display = "block";
   }else{
      document.getElementById("navbar").style.display = "none";
   }
}

function cadastrar(event){
   event.preventDefault();
   const user_cad = document.getElementById("user_cadastro").value.trim();
   const email_cad = document.getElementById("email_cadastro").value.trim();
   const senha_cad = document.getElementById("passw_cadastro").value.trim();
   
   if(!user_cad || !email_cad || !senha_cad){
      alert("preencha todos os campos por favor!");
      return;
   }
   
   let new_user = JSON.parse(localStorage.getItem("new_user")) || [];
   
   
   if(new_user.find(u => u.username === user_cad || u.password === senha_cad)){
      alert("Uma conta ja existe com essas credencias");
      return;
   }
   
   new_user.push({
      username: user_cad,
      email: email_cad,
      password: senha_cad,
      
   });
   
   localStorage.setItem("new_user", JSON.stringify(new_user));
   
   alert("Cadastro feito com sucesso!");
   slide_page("login_page");
}

function login(event){
  event.preventDefault();

  const log_user = document.getElementById("user_login").value.trim();
  const log_password = document.getElementById("password_login").value.trim();

  if(!log_user || !log_password){
    alert("Preencha todos os dados por favor");
    return;
  }

  let users = JSON.parse(localStorage.getItem("new_user")) || [];

  let found_user = users.find(u => 
    (u.username === log_user || u.email === log_user) && u.password === log_password
  );

  if(!found_user){
    alert("Usuário ou senha inválidos");
    return;
  }

  localStorage.setItem("user_account", JSON.stringify(found_user));
  
  let user_logged = JSON.parse(localStorage.getItem("user_account"));
  
  alert(`Bem-vindo, ${found_user.username}!`);
  slide_page("homepage");
}

function logout(event){
   localStorage.removeItem("new_user");
   alert("conta excluída com sucesso!");
   slide_page("cadastro_page");
}

const get_files = document.getElementById("file_select");
const img_preview = document.getElementById("preview_file");

if (get_files && img_preview) { 
    get_files.addEventListener('change', function(event) {
        const files = event.target.files; 
        
        if (files.length > 0) {
            const file_selected = files[0];
            alert(`Arquivo selecionado:
                Nome: ${file_selected.name}
                Tamanho: ${file_selected.size} bytes
                Tipo: ${file_selected.type}`
            );
            
            const reader = new FileReader();
            
            reader.onload = function(e){
                img_preview.src = e.target.result;
                img_preview.style.display = "block";
            }
            reader.readAsDataURL(file_selected); 
            
        } else {
            img_preview.src = "#";
            img_preview.style.display = "none";
            alert("Nenhum arquivo selecionado.");
        }
    });
} else {
    console.error("Um ou mais elementos com ID 'file_select' ou 'preview_file' não foram encontrados!");
}

function post_submit() {
  const text_post = document.getElementById("post_text").value;
  const files_post = document.getElementById("file_select").files;
  const feed = document.getElementById("feed_page");
  const number_posts = document.getElementById("status_msg");

  let feed_section = document.createElement("div");
  feed_section.className = "feed";

  if (text_post.trim() !== "") {
    let my_feed = document.createElement("p");
    my_feed.textContent = text_post;
    feed_section.appendChild(my_feed);
  }

  for (let i = 0; i < files_post.length; i++) {
    let img_feed = document.createElement("img");
    img_feed.src = URL.createObjectURL(files_post[i]);
    img_feed.style.maxWidth = "200px";
    img_feed.style.display = "block";
    feed_section.appendChild(img_feed);
  }

  feed.appendChild(feed_section);

  const conclusion_msg = document.getElementById("post_msg");
  post_msg.textContent = "Postagem feita com sucesso!";
  
  let totalPosts = feed.children.length;
  number_posts.textContent = `${totalPosts} postagem${totalPosts > 1 ? "s" : ""} feitas`;

  document.getElementById("post_text").value = "";
  document.getElementById("file_select").value = "";
  
}

window.onload = function(){
  const user_logged = JSON.parse(localStorage.getItem("user_account"));
  if(user_logged && user_logged.username){
    document.getElementById("name_perfil").textContent = `@${user_logged.username}`;
  }
}