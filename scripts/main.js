"use strict";!function(){var t=20,e=2.2*t,i=[],n=!0,r=fabric.Point,a=fabric.util.requestAnimFrame,o=new r(0,0),d=1,u=1,c=document.getElementById("c");c.setAttribute("width",window.innerWidth),c.setAttribute("height",window.innerHeight);var h=document.getElementById("strength"),s=document.getElementById("speed"),w=new fabric.Canvas("c");w.selection=!1;var f,l=function(e){var i=h.value;w.forEachObject(function(n){var r=Math.abs(e.x-n.left),a=Math.abs(e.y-n.top),o=Math.round(Math.sqrt(Math.pow(r,2)+Math.pow(a,2))),d=t/(o/i);d=Math.min(d,1.5*t),n.set({radius:d})}),w.renderAll()};w.on("mouse:move",function(t){var e=w.getPointer(t.e);l(e),o=e,n=!1,clearTimeout(f),f=setTimeout(function(){n=!0},500)});for(var v=0;v<window.innerWidth/e-1;v++){i[v]=[];for(var m=0;m<window.innerHeight/e-1;m++){var g=new fabric.Circle({originX:t/2,originY:t/2,top:(m+1)*e,left:(v+1)*e,radius:t,fill:"#B6D3DC"});i[v].push(g),g.i=v,g.j=m,w.add(g)}}var b=function(){if(a(b),n){var t=s.value;o.x+=d*t,o.y+=u*t,(o.x>window.innerWidth||o.x<0)&&(d*=-1),(o.y>window.innerHeight||o.y<0)&&(u*=-1),l(o)}};b()}();