  503  mkdir desarrollo
  505  cd desarrollo
  519  sudo npm install -g @angular/cli
  521  ng v
  525  mkdir angular
  526  cd angular/
  527  ng n hello
  529  cd hello
  531  ng s -o
  533  ng v
  536  cd ..
  538  ng n adminpro
  540  cd adminpro/
  543  ng s 
  573  npm i -S jquery popper.js font-awesome bootstrap

  547  ng g c login
  550  rm src/app/login/login.component.css 
  551  rm src/app/login/login.component.spec.ts 

  552  ng g c nopagefound --spec=false -is
  553  ng g c pages/dashboard --skipTest -is
  556  ng g c pages/progress -skipTest -is
  557  ng g c pages/graficas1 -skipTest -is
  558  ng g c shared/header -skipTest -is
  559  ng g c shared/sidebar -skipTest -is
  560  ng g c shared/breadcrumbs -skipTest -is

  569  ng g s services/shared --spec=false
  572  ng g s services/sidebar --spec=false

  576  ng g c pages/pages --flat -is --spec=false
  577  ng g c login/register --flat -is --spec=false
  578  pwd
  579  git
  580  git status
  581  git init
  582  git add .
  583  git status
  584  git commit -m "Plantilla vacía"
  585  git remote add origin https://github.com/pmacia/adminpro.git
  586  git push -u origin master
  587  git status
  588  git commit -am "Rutas en módulos"
  589  git add
  590  git status
  591  gid add
  592  git add
  593  git status
  594  git add .
  595  git status
  596  git commit -am "Rutas en módulos"
  597  git push
  598  git tag -a v1.0.0 -m "Versión 1 - Esqueleto funcional vacío listo para producción"
  599  git push --tgas
  600  git push --tags
  601  git status
  602  git add .
  603  git commit -m "Versión 1 con bugs corregidos: wrapper y router-outlet
"
  604  git push
  605  git tag -a v1.0.1 -m "Versión 1 - Esqueleto funcional vacío listo para producción"
  606  git push --tags
  607  history
  608  history | tail -110
  609  history | tail -108 > historico-v1.sh
  610  git status
  611  more *.sh
  612  more *.sh
  613  history | tail -150 > historico-v1.sh
  614  more *.sh
  615  history | tail -n 120 > historico-v1.sh
  616  more *.sh
  617  rm historico-v1.sh 
  618  history | tail -n 120
  619  history | tail -n 120 > historico-adminpro-v1.sh
