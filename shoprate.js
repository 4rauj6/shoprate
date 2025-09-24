function slide_page(pages_id){
   document.querySelectorAll(".pages").forEach(pages => {
      pages.style.display = "none";
   });
   document.getElementById(pages_id).style.display = "block";
   
   if(pages_id === "homepage" || pages_id === "perfil_page" || pages_id === "make_post_page"){
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
   slide_page("login_page");
}

window.onload = function(){
  const user_logged = JSON.parse(localStorage.getItem("user_account"));
  if(user_logged && user_logged.username){
    document.getElementById("name_perfil").textContent = ` ${user_logged.username}`;
  }
}

