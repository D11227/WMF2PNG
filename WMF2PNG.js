var UDOC={};function FromWMF(){}function ToContext2D(t,r){this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d"),this.bb=null,this.currPage=0,this.needPage=t,this.scale=r}UDOC.G={concat:function(t,r){for(var e=0;e<r.cmds.length;e++)t.cmds.push(r.cmds[e]);for(e=0;e<r.crds.length;e++)t.crds.push(r.crds[e])},getBB:function(t){for(var r=1e99,e=1e99,o=-r,n=-e,T=0;T<t.length;T+=2){var a=t[T],E=t[T+1];a<r?r=a:a>o&&(o=a),E<e?e=E:E>n&&(n=E)}return[r,e,o,n]},rectToPath:function(t){return{cmds:["M","L","L","L","Z"],crds:[t[0],t[1],t[2],t[1],t[2],t[3],t[0],t[3]]}},insideBox:function(t,r){return r[0]<=t[0]&&r[1]<=t[1]&&t[2]<=r[2]&&t[3]<=r[3]},isBox:function(t,r){var e=function(t,r){for(var e=0;e<8;e+=2){for(var o=!0,n=0;n<8;n++)if(Math.abs(r[n]-t[n+e&7])>=2){o=!1;break}if(o)return!0}return!1};if(t.cmds.length>10)return!1;var o=t.cmds.join(""),n=t.crds,T=!1;if("MLLLZ"==o&&8==n.length||"MLLLLZ"==o&&10==n.length){10==n.length&&(n=n.slice(0,8));var a=r[0],E=r[1],i=r[2],l=r[3];T||(T=e(n,[a,E,i,E,i,l,a,l])),T||(T=e(n,[a,l,i,l,i,E,a,E]))}return T},boxArea:function(t){return(t[2]-t[0])*(t[3]-t[1])},newPath:function(t){t.pth={cmds:[],crds:[]}},moveTo:function(t,r,e){var o=UDOC.M.multPoint(t.ctm,[r,e]);t.pth.cmds.push("M"),t.pth.crds.push(o[0],o[1]),t.cpos=o},lineTo:function(t,r,e){var o=UDOC.M.multPoint(t.ctm,[r,e]);t.cpos[0]==o[0]&&t.cpos[1]==o[1]||(t.pth.cmds.push("L"),t.pth.crds.push(o[0],o[1]),t.cpos=o)},curveTo:function(t,r,e,o,n,T,a){var E;r=(E=UDOC.M.multPoint(t.ctm,[r,e]))[0],e=E[1],o=(E=UDOC.M.multPoint(t.ctm,[o,n]))[0],n=E[1],T=(E=UDOC.M.multPoint(t.ctm,[T,a]))[0],a=E[1],t.cpos=E,t.pth.cmds.push("C"),t.pth.crds.push(r,e,o,n,T,a)},closePath:function(t){t.pth.cmds.push("Z")},arc:function(t,r,e,o,n,T,a){if(a)for(;T>n;)T-=2*Math.PI;else for(;T<n;)T+=2*Math.PI;var E=(T-n)/4,i=Math.cos(E/2),l=-Math.sin(E/2),c=(4-i)/3,s=0==l?l:(1-i)*(3-i)/(3*l),f=c,M=-s,h=i,C=-l,u=[c,s],O=[f,M],A=[h,C],m={cmds:[0==t.pth.cmds.length?"M":"L","C","C","C","C"],crds:[i,l,c,s,f,M,h,C]},P=[1,0,0,1,0,0];UDOC.M.rotate(P,-E);for(var d=0;d<3;d++)u=UDOC.M.multPoint(P,u),O=UDOC.M.multPoint(P,O),A=UDOC.M.multPoint(P,A),m.crds.push(u[0],u[1],O[0],O[1],A[0],A[1]);var D=[o,0,0,o,r,e];UDOC.M.rotate(P,E/2-n),UDOC.M.concat(P,D),UDOC.M.multArray(P,m.crds),UDOC.M.multArray(t.ctm,m.crds),UDOC.G.concat(t.pth,m);e=m.crds.pop();r=m.crds.pop(),t.cpos=[r,e]},toPoly:function(t){if("M"!=t.cmds[0]||"Z"!=t.cmds[t.cmds.length-1])return null;for(var r=1;r<t.cmds.length-1;r++)if("L"!=t.cmds[r])return null;var e=[],o=t.crds.length;t.crds[0]==t.crds[o-2]&&t.crds[1]==t.crds[o-1]&&(o-=2);for(r=0;r<o;r+=2)e.push([t.crds[r],t.crds[r+1]]);return UDOC.G.polyArea(t.crds)<0&&e.reverse(),e},fromPoly:function(t){for(var r={cmds:[],crds:[]},e=0;e<t.length;e++)r.crds.push(t[e][0],t[e][1]),r.cmds.push(0==e?"M":"L");return r.cmds.push("Z"),r},polyArea:function(t){if(t.length<6)return 0;for(var r=t.length-2,e=(t[0]-t[r])*(t[r+1]+t[1]),o=0;o<r;o+=2)e+=(t[o+2]-t[o])*(t[o+1]+t[o+3]);return.5*-e},polyClip:function(t,r){var e,o,n=function(t){return(E[0]-e[0])*(t[1]-e[1])>(E[1]-e[1])*(t[0]-e[0])},T=function(){var t=[e[0]-E[0],e[1]-E[1]],r=[o[0]-c[0],o[1]-c[1]],n=e[0]*E[1]-e[1]*E[0],T=o[0]*c[1]-o[1]*c[0],a=1/(t[0]*r[1]-t[1]*r[0]);return[(n*r[0]-T*t[0])*a,(n*r[1]-T*t[1])*a]},a=t;for(j in e=r[r.length-1],r){var E=r[j],l=a;for(i in a=[],o=l[l.length-1],l){var c;n(c=l[i])?(n(o)||a.push(T()),a.push(c)):n(o)&&a.push(T()),o=c}e=E}return a}},UDOC.M={getScale:function(t){return Math.sqrt(Math.abs(t[0]*t[3]-t[1]*t[2]))},translate:function(t,r,e){UDOC.M.concat(t,[1,0,0,1,r,e])},rotate:function(t,r){UDOC.M.concat(t,[Math.cos(r),-Math.sin(r),Math.sin(r),Math.cos(r),0,0])},scale:function(t,r,e){UDOC.M.concat(t,[r,0,0,e,0,0])},concat:function(t,r){var e=t[0],o=t[1],n=t[2],T=t[3],a=t[4],E=t[5];t[0]=e*r[0]+o*r[2],t[1]=e*r[1]+o*r[3],t[2]=n*r[0]+T*r[2],t[3]=n*r[1]+T*r[3],t[4]=a*r[0]+E*r[2]+r[4],t[5]=a*r[1]+E*r[3]+r[5]},invert:function(t){var r=t[0],e=t[1],o=t[2],n=t[3],T=t[4],a=t[5],E=r*n-e*o;t[0]=n/E,t[1]=-e/E,t[2]=-o/E,t[3]=r/E,t[4]=(o*a-n*T)/E,t[5]=(e*T-r*a)/E},multPoint:function(t,r){var e=r[0],o=r[1];return[e*t[0]+o*t[2]+t[4],e*t[1]+o*t[3]+t[5]]},multArray:function(t,r){for(var e=0;e<r.length;e+=2){var o=r[e],n=r[e+1];r[e]=o*t[0]+n*t[2]+t[4],r[e+1]=o*t[1]+n*t[3]+t[5]}}},UDOC.C={srgbGamma:function(t){return t<.0031308?12.92*t:1.055*Math.pow(t,1/2.4)-.055},cmykToRgb:function(t){var r=t[0],e=t[1],o=t[2],n=t[3],T=255+r*(-4.387332384609988*r+54.48615194189176*e+18.82290502165302*o+212.25662451639585*n-285.2331026137004)+e*(1.7149763477362134*e-5.6096736904047315*o+-17.873870861415444*n-5.497006427196366)+o*(-2.5217340131683033*o-21.248923337353073*n+17.5119270841813)+n*(-21.86122147463605*n-189.48180835922747),a=255+r*(8.841041422036149*r+60.118027045597366*e+6.871425592049007*o+31.159100130055922*n-79.2970844816548)+e*(-15.310361306967817*e+17.575251261109482*o+131.35250912493976*n-190.9453302588951)+o*(4.444339102852739*o+9.8632861493405*n-24.86741582555878)+n*(-20.737325471181034*n-187.80453709719578),E=255+r*(.8842522430003296*r+8.078677503112928*e+30.89978309703729*o-.23883238689178934*n-14.183576799673286)+e*(10.49593273432072*e+63.02378494754052*o+50.606957656360734*n-112.23884253719248)+o*(.03296041114873217*o+115.60384449646641*n-193.58209356861505)+n*(-22.33816807309886*n-180.12613974708367);return[Math.max(0,Math.min(1,T/255)),Math.max(0,Math.min(1,a/255)),Math.max(0,Math.min(1,E/255))]},labToRgb:function(t){for(var r=903.3,e=.008856,o=t[0],n=t[1],T=(o+16)/116,a=T*T*T,E=T-t[2]/200,i=E*E*E,l=n/500+T,c=l*l*l,s=[96.72*(c>e?c:(116*l-16)/r)/100,100*(a>e?a:(116*T-16)/r)/100,81.427*(i>e?i:(116*E-16)/r)/100],f=[3.1338561,-1.6168667,-.4906146,-.9787684,1.9161415,.033454,.0719453,-.2289914,1.4052427],M=[f[0]*s[0]+f[1]*s[1]+f[2]*s[2],f[3]*s[0]+f[4]*s[1]+f[5]*s[2],f[6]*s[0]+f[7]*s[1]+f[8]*s[2]],h=0;h<3;h++)M[h]=Math.max(0,Math.min(1,UDOC.C.srgbGamma(M[h])));return M}},UDOC.getState=function(t){return{font:UDOC.getFont(),dd:{flat:1},space:"/DeviceGray",ca:1,colr:[0,0,0],sspace:"/DeviceGray",CA:1,COLR:[0,0,0],bmode:"/Normal",SA:!1,OPM:0,AIS:!1,OP:!1,op:!1,SMask:"/None",lwidth:1,lcap:0,ljoin:0,mlimit:10,SM:.1,doff:0,dash:[],ctm:[1,0,0,1,0,0],cpos:[0,0],pth:{cmds:[],crds:[]},cpth:t?UDOC.G.rectToPath(t):null}},UDOC.getFont=function(){return{Tc:0,Tw:0,Th:100,Tl:0,Tf:"Helvetica-Bold",Tfs:1,Tmode:0,Trise:0,Tk:0,Tal:0,Tun:0,Tm:[1,0,0,1,0,0],Tlm:[1,0,0,1,0,0],Trm:[1,0,0,1,0,0]}},FromWMF.Parse=function(t,r){t=new Uint8Array(t);var e=0,o={fill:!1,strk:!1,bb:[0,0,1,1],lbb:[0,0,1,1],scl:1,fnt:{nam:"Arial",hgh:25,und:!1,orn:0,chrst:0},tclr:[0,0,0],talg:0},n=FromWMF.B.readShort,T=FromWMF.B.readUshort,a=FromWMF.B.readUint;if(2596720087==a(t,0)){var E=n(t,(e=6)+8);o.scl=120/E;for(var i=0;i<4;i++)o.bb[i]=Math.round(n(t,e)*o.scl),e+=2;e+=2,e+=6}r.StartPage(o.bb[0],o.bb[1],o.bb[2],o.bb[3]);var l=UDOC.getState(o.bb);T(t,e),T(t,e+=2),T(t,e+=2),a(t,e+=2),T(t,e+=4),a(t,e+=2),T(t,e+=4);e+=2;for(var c=[];;){var s=a(t,e)<<1,f=T(t,e+=4);e+=2;var M=FromWMF.K[f],h=e,C=null;if("EOF"==M)break;if("ESCAPE"==M){var u=T(t,e);h+=2;var O=FromWMF.K2[u];console.log(M,O)}else if("SETMAPMODE"==M||"SETPOLYFILLMODE"==M||"SETBKMODE"==M);else if("SELECTOBJECT"==M){var A=T(t,h);h+=2;var m=c[A];if("br"==m.t){if(o.fill=1!=m.stl,0==m.stl);else if(1!=m.stl)throw m.stl+" e";l.colr=m.clr}else if("pn"==m.t){var P=7&m.stl;if(o.strk=5!=P,0==P||6==P)l.lwidth=m.px;else if(5!=P)throw P+" e";0!=(4096&m.stl)?l.ljoin=2:0!=(8192&m.stl)?l.ljoin=0:l.ljoin=1,l.COLR=m.clr}else{if("fn"!=m.t)throw"e";o.fnt=m,l.font.Tf=m.nam,l.font.Tfs=Math.abs(m.hgh),l.font.Tun=m.und}}else if("DELETEOBJECT"==M){A=T(t,h);h+=2,c[A]=null}else if("SETWINDOWORG"==M||"SETWINDOWEXT"==M){var d="SETWINDOWORG"==M?0:2;o.lbb[d+1]=n(t,h),h+=2,o.lbb[d]=n(t,h),h+=2,FromWMF._updateCtm(o,l)}else if("CREATEBRUSHINDIRECT"==M)(C={t:"br"}).stl=T(t,h),h+=2,C.clr=[t[h]/255,t[h+1]/255,t[h+2]/255],h+=4,C.htc=T(t,h),h+=2;else if("CREATEPENINDIRECT"==M)(C={t:"pn"}).stl=T(t,h),h+=2,C.px=n(t,h),h+=2,C.py=n(t,h),h+=2,C.clr=[t[h]/255,t[h+1]/255,t[h+2]/255],h+=4;else if("CREATEFONTINDIRECT"==M){(C={t:"fn",nam:""}).hgh=n(t,h),h+=2,h+=4,C.orn=n(t,h)/10;var D=n(t,h+=2);for(h+=2,C.und=t[h+1],h+=2,C.stk=t[h],C.chrst=t[e+1],h+=2,h+=4;0!=t[h];)C.nam+=String.fromCharCode(t[h]),h++;D>500&&(C.nam+="-Bold")}else if("CREATEPALETTE"==M)C={t:"pl"};else if("SETTEXTCOLOR"==M)o.tclr=[t[h]/255,t[h+1]/255,t[h+2]/255];else if("SETTEXTALIGN"==M)o.talg=T(t,h);else if("MOVETO"==M)UDOC.G.moveTo(l,n(t,h+2),n(t,h));else if("LINETO"==M){if(0==l.pth.cmds.length){var S=l.ctm.slice(0);UDOC.M.invert(S);var F=UDOC.M.multPoint(S,l.cpos);UDOC.G.moveTo(l,F[0],F[1])}UDOC.G.lineTo(l,n(t,h+2),n(t,h));var I=o.fill;o.fill=!1,FromWMF._draw(r,l,o),o.fill=I}else if("POLYPOLYGON"==M){var R=T(t,h),_=h+=2;h+=2*R;for(i=0;i<R;i++){var v=T(t,_+2*i);h=FromWMF._drawPoly(t,h,v,l,!0)}FromWMF._draw(r,l,o)}else if("POLYGON"==M||"POLYLINE"==M){v=T(t,h);h+=2,h=FromWMF._drawPoly(t,h,v,l,"POLYGON"==M);I=o.fill;o.fill=I&&"POLYGON"==M,FromWMF._draw(r,l,o),o.fill=I}else if("RECTANGLE"==M||"ELLIPSE"==M){var L=n(t,h),p=n(t,h+=2),g=n(t,h+=2),N=n(t,h+=2);if(h+=2,"RECTANGLE"==M)UDOC.G.moveTo(l,N,g),UDOC.G.lineTo(l,p,g),UDOC.G.lineTo(l,p,L),UDOC.G.lineTo(l,N,L);else{var U=(N+p)/2,G=(g+L)/2;UDOC.G.arc(l,U,G,(L-g)/2,0,2*Math.PI,!1)}UDOC.G.closePath(l);I=o.fill;o.fill=!0,FromWMF._draw(r,l,o),o.fill=I}else if("STRETCHDIB"==M){a(t,h),T(t,h+=4);var B=n(t,h+=2),W=n(t,h+=2),b=(n(t,h+=2),n(t,h+=2),n(t,h+=2)),w=n(t,h+=2),y=n(t,h+=2),x=n(t,h+=2);h+=2;var H=FromWMF._loadDIB(t,h),X=l.ctm.slice(0);l.ctm=[1,0,0,1,0,0],UDOC.M.scale(l.ctm,w,-b),UDOC.M.translate(l.ctm,x,y+b),UDOC.M.concat(l.ctm,X),r.PutImage(l,H,W,B),l.ctm=X}else if("EXTTEXTOUT"==M){var Y=n(t,h),k=n(t,h+=2);h+=2,l.font.Tm=[1,0,0,-1,0,0],UDOC.M.rotate(l.font.Tm,o.fnt.orn*Math.PI/180),UDOC.M.translate(l.font.Tm,k,Y);var V=o.talg;if(6==(6&V))l.font.Tal=2;else if(0==(7&V))l.font.Tal=0;else{if(0!=(4&V))throw V+" e";l.font.Tal=4}if(24==(24&V));else{if(0!=(24&V))throw"e";UDOC.M.translate(l.font.Tm,0,l.font.Tfs)}var K=T(t,h),Z=T(t,h+=2);h+=2,4&Z&&(h+=8);var J="";for(i=0;i<K;i++){var j=t[h+i];j>127&&(j=j<<8|t[h+ ++i]),J+=String.fromCharCode(j)}var q=l.colr;l.colr=o.tclr,r.PutText(l,J,J.length*l.font.Tfs*.5),l.colr=q}else console.log(M,s);if(null!=C){for(var Q=0;null!=c[Q];)Q++;c[Q]=C}e+=s-6}r.ShowPage(),r.Done()},FromWMF._loadDIB=function(t,r){FromWMF.B.readShort;var e,o,n,T=FromWMF.B.readUshort,a=FromWMF.B.readUint;if(12==a(t,r))throw"e";e=a(t,r+=4),o=a(t,r+=4);var E=T(t,r+=4);if(1!=E)throw"e";var i=T(t,r+=2);if(1!=i&&24!=i&&32!=i)throw i+" e";if(0!=a(t,r+=2))throw"e";a(t,r+=4),a(t,r+=4),a(t,r+=4);n=a(t,r+=4);a(t,r+=4);r+=4;var l=new Uint8Array(4*(e*o)),c=Math.floor((e*E*i+31&-32)/8);if(1==i)for(var s=0;s<o;s++)for(var f=r+4*n+(o-1-s)*c,M=0;M<e;M++){var h=s*e+M<<2,C=t[f+(M>>>3)]>>>7-(7&M)&1;l[h]=t[r+4*C+2],l[h+1]=t[r+4*C+1],l[h+2]=t[r+4*C+0],l[h+3]=255}if(24==i)for(s=0;s<o;s++)for(M=0;M<e;M++){var u=r+(o-1-s)*c+3*M;l[h=s*e+M<<2]=t[u+2],l[h+1]=t[u+1],l[h+2]=t[u+0],l[h+3]=255}if(32==i)for(s=0;s<o;s++)for(M=0;M<e;M++){u=r+(o-1-s)*c+4*M;l[h=s*e+M<<2]=t[u+2],l[h+1]=t[u+1],l[h+2]=t[u+0],l[h+3]=t[u+3]}return l},FromWMF._updateCtm=function(t,r){var e=[1,0,0,1,0,0],o=t.lbb,n=t.bb;UDOC.M.translate(e,-o[0],-o[1]),UDOC.M.scale(e,1/o[2],1/o[3]),UDOC.M.scale(e,n[2]-n[0],n[3]-n[1]),UDOC.M.translate(e,n[0],n[1]),r.ctm=e},FromWMF._draw=function(t,r,e){e.fill&&t.Fill(r,!1),e.strk&&0!=r.lwidth&&t.Stroke(r,!1),UDOC.G.newPath(r)},FromWMF._drawPoly=function(t,r,e,o,n){for(var T=FromWMF.B.readShort,a=0;a<e;a++){var E=T(t,r),i=T(t,r+=2);r+=2,0==a?UDOC.G.moveTo(o,E,i):UDOC.G.lineTo(o,E,i)}return n&&UDOC.G.closePath(o),r},FromWMF.B={uint8:new Uint8Array(4),readShort:function(t,r){var e=FromWMF.B.uint8;return e[0]=t[r],e[1]=t[r+1],FromWMF.B.int16[0]},readUshort:function(t,r){var e=FromWMF.B.uint8;return e[0]=t[r],e[1]=t[r+1],FromWMF.B.uint16[0]},readUint:function(t,r){var e=FromWMF.B.uint8;return e[0]=t[r],e[1]=t[r+1],e[2]=t[r+2],e[3]=t[r+3],FromWMF.B.uint32[0]},readASCII:function(t,r,e){for(var o="",n=0;n<e;n++)o+=String.fromCharCode(t[r+n]);return o}},FromWMF.B.int16=new Int16Array(FromWMF.B.uint8.buffer),FromWMF.B.uint16=new Uint16Array(FromWMF.B.uint8.buffer),FromWMF.B.uint32=new Uint32Array(FromWMF.B.uint8.buffer),FromWMF.C={META_EOF:0,META_REALIZEPALETTE:53,META_SETPALENTRIES:55,META_SETBKMODE:258,META_SETMAPMODE:259,META_SETROP2:260,META_SETRELABS:261,META_SETPOLYFILLMODE:262,META_SETSTRETCHBLTMODE:263,META_SETTEXTCHAREXTRA:264,META_RESTOREDC:295,META_RESIZEPALETTE:313,META_DIBCREATEPATTERNBRUSH:322,META_SETLAYOUT:329,META_SETBKCOLOR:513,META_SETTEXTCOLOR:521,META_OFFSETVIEWPORTORG:529,META_LINETO:531,META_MOVETO:532,META_OFFSETCLIPRGN:544,META_FILLREGION:552,META_SETMAPPERFLAGS:561,META_SELECTPALETTE:564,META_POLYGON:804,META_POLYLINE:805,META_SETTEXTJUSTIFICATION:522,META_SETWINDOWORG:523,META_SETWINDOWEXT:524,META_SETVIEWPORTORG:525,META_SETVIEWPORTEXT:526,META_OFFSETWINDOWORG:527,META_SCALEWINDOWEXT:1040,META_SCALEVIEWPORTEXT:1042,META_EXCLUDECLIPRECT:1045,META_INTERSECTCLIPRECT:1046,META_ELLIPSE:1048,META_FLOODFILL:1049,META_FRAMEREGION:1065,META_ANIMATEPALETTE:1078,META_TEXTOUT:1313,META_POLYPOLYGON:1336,META_EXTFLOODFILL:1352,META_RECTANGLE:1051,META_SETPIXEL:1055,META_ROUNDRECT:1564,META_PATBLT:1565,META_SAVEDC:30,META_PIE:2074,META_STRETCHBLT:2851,META_ESCAPE:1574,META_INVERTREGION:298,META_PAINTREGION:299,META_SELECTCLIPREGION:300,META_SELECTOBJECT:301,META_SETTEXTALIGN:302,META_ARC:2071,META_CHORD:2096,META_BITBLT:2338,META_EXTTEXTOUT:2610,META_SETDIBTODEV:3379,META_DIBBITBLT:2368,META_DIBSTRETCHBLT:2881,META_STRETCHDIB:3907,META_DELETEOBJECT:496,META_CREATEPALETTE:247,META_CREATEPATTERNBRUSH:505,META_CREATEPENINDIRECT:762,META_CREATEFONTINDIRECT:763,META_CREATEBRUSHINDIRECT:764,META_CREATEREGION:1791},FromWMF.C2={NEWFRAME:1,ABORTDOC:2,NEXTBAND:3,SETCOLORTABLE:4,GETCOLORTABLE:5,FLUSHOUT:6,DRAFTMODE:7,QUERYESCSUPPORT:8,SETABORTPROC:9,STARTDOC:10,ENDDOC:11,GETPHYSPAGESIZE:12,GETPRINTINGOFFSET:13,GETSCALINGFACTOR:14,META_ESCAPE_ENHANCED_METAFILE:15,SETPENWIDTH:16,SETCOPYCOUNT:17,SETPAPERSOURCE:18,PASSTHROUGH:19,GETTECHNOLOGY:20,SETLINECAP:21,SETLINEJOIN:22,SETMITERLIMIT:23,BANDINFO:24,DRAWPATTERNRECT:25,GETVECTORPENSIZE:26,GETVECTORBRUSHSIZE:27,ENABLEDUPLEX:28,GETSETPAPERBINS:29,GETSETPRINTORIENT:30,ENUMPAPERBINS:31,SETDIBSCALING:32,EPSPRINTING:33,ENUMPAPERMETRICS:34,GETSETPAPERMETRICS:35,POSTSCRIPT_DATA:37,POSTSCRIPT_IGNORE:38,GETDEVICEUNITS:42,GETEXTENDEDTEXTMETRICS:256,GETPAIRKERNTABLE:258,EXTTEXTOUT:512,GETFACENAME:513,DOWNLOADFACE:514,METAFILE_DRIVER:2049,QUERYDIBSUPPORT:3073,BEGIN_PATH:4096,CLIP_TO_PATH:4097,END_PATH:4098,OPEN_CHANNEL:4110,DOWNLOADHEADER:4111,CLOSE_CHANNEL:4112,POSTSCRIPT_PASSTHROUGH:4115,ENCAPSULATED_POSTSCRIPT:4116,POSTSCRIPT_IDENTIFY:4117,POSTSCRIPT_INJECTION:4118,CHECKJPEGFORMAT:4119,CHECKPNGFORMAT:4120,GET_PS_FEATURESETTING:4121,MXDC_ESCAPE:4122,SPCLPASSTHROUGH2:4568},FromWMF.K=[],FromWMF.K2=[],function(){var t,r,e;for(var o in t=FromWMF.C,r=FromWMF.K,e=5,t)r[t[o]]=o.slice(e);for(var o in t=FromWMF.C2,r=FromWMF.K2,e=0,t)r[t[o]]=o.slice(e)}(),ToContext2D.prototype.StartPage=function(t,r,e,o){if(this.currPage==this.needPage){this.bb=[t,r,e,o];var n=this.scale,T=window.devicePixelRatio,a=this.canvas,E=this.ctx;a.width=Math.round(e*n),a.height=Math.round(o*n),E.translate(0,o*n),E.scale(n,-n),a.setAttribute("style","border:1px solid; width:"+a.width/T+"px; height:"+a.height/T+"px")}},ToContext2D.prototype.Fill=function(t,r){if(this.currPage==this.needPage){var e=this.ctx;e.beginPath(),this._setStyle(t,e),this._draw(t.pth,e),e.fill()}},ToContext2D.prototype.Stroke=function(t){if(this.currPage==this.needPage){var r=this.ctx;r.beginPath(),this._setStyle(t,r),this._draw(t.pth,r),r.stroke()}},ToContext2D.prototype.PutText=function(t,r,e){if(this.currPage==this.needPage){this._scale(t.ctm);var o=this.ctx;this._setStyle(t,o),o.save();var n=[1,0,0,-1,0,0];this._concat(n,t.font.Tm),this._concat(n,t.ctm),o.transform(n[0],n[1],n[2],n[3],n[4],n[5]),o.fillText(r,0,0),o.restore()}},ToContext2D.prototype.PutImage=function(t,r,e,o,n){if(this.currPage==this.needPage){var T=this.ctx;if(r.length==e*o*4){if(r=r.slice(0),n&&n.length==e*o*4)for(var a=0;a<r.length;a+=4)r[a+3]=n[a+1];var E=document.createElement("canvas"),i=E.getContext("2d");E.width=e,E.height=o;var l=i.createImageData(e,o);for(a=0;a<r.length;a++)l.data[a]=r[a];i.putImageData(l,0,0),T.save();var c=[1,0,0,1,0,0];this._concat(c,[1/e,0,0,-1/o,0,1]),this._concat(c,t.ctm),T.transform(c[0],c[1],c[2],c[3],c[4],c[5]),T.drawImage(E,0,0),T.restore()}}},ToContext2D.prototype.ShowPage=function(){this.currPage++},ToContext2D.prototype.Done=function(){},ToContext2D.prototype._setStyle=function(t,r){var e=this._scale(t.ctm);r.fillStyle=this._getFill(t.colr,t.ca,r),r.strokeStyle=this._getFill(t.COLR,t.CA,r),r.lineCap=["butt","round","square"][t.lcap],r.lineJoin=["miter","round","bevel"][t.ljoin],r.lineWidth=t.lwidth*e;for(var o=t.dash.slice(0),n=0;n<o.length;n++)o[n]=ToPDF._flt(o[n]*e);r.setLineDash(o),r.miterLimit=t.mlimit*e;var T=t.font.Tf,a=T.toLowerCase(),E=-1!=a.indexOf("bold")?"bold ":"",i=-1!=a.indexOf("italic")||-1!=a.indexOf("oblique")?"italic ":"";r.font=E+i+t.font.Tfs+'px "'+T+'"'},ToContext2D.prototype._getFill=function(t,r,e){if(null==t.typ)return this._colr(t,r);var o,n=t,T=n.crds,a=n.mat,E=this._scale(a);if("lin"==n.typ){var i=this._multPoint(a,T.slice(0,2)),l=this._multPoint(a,T.slice(2));o=e.createLinearGradient(i[0],i[1],l[0],l[1])}else if("rad"==n.typ){i=this._multPoint(a,T.slice(0,2)),l=this._multPoint(a,T.slice(3));o=e.createRadialGradient(i[0],i[1],T[2]*E,l[0],l[1],T[5]*E)}for(var c=0;c<n.grad.length;c++)o.addColorStop(n.grad[c][0],this._colr(n.grad[c][1],r));return o},ToContext2D.prototype._colr=function(t,r){return"rgba("+Math.round(255*t[0])+","+Math.round(255*t[1])+","+Math.round(255*t[2])+","+r+")"},ToContext2D.prototype._scale=function(t){return Math.sqrt(Math.abs(t[0]*t[3]-t[1]*t[2]))},ToContext2D.prototype._concat=function(t,r){var e=t[0],o=t[1],n=t[2],T=t[3],a=t[4],E=t[5];t[0]=e*r[0]+o*r[2],t[1]=e*r[1]+o*r[3],t[2]=n*r[0]+T*r[2],t[3]=n*r[1]+T*r[3],t[4]=a*r[0]+E*r[2]+r[4],t[5]=a*r[1]+E*r[3]+r[5]},ToContext2D.prototype._multPoint=function(t,r){var e=r[0],o=r[1];return[e*t[0]+o*t[2]+t[4],e*t[1]+o*t[3]+t[5]]},ToContext2D.prototype._draw=function(t,r){for(var e=0,o=t.crds,n=0;n<t.cmds.length;n++){var T=t.cmds[n];"M"==T?(r.moveTo(o[e],o[e+1]),e+=2):"L"==T?(r.lineTo(o[e],o[e+1]),e+=2):"C"==T?(r.bezierCurveTo(o[e],o[e+1],o[e+2],o[e+3],o[e+4],o[e+5]),e+=6):"Q"==T?(r.quadraticCurveTo(o[e],o[e+1],o[e+2],o[e+3]),e+=4):"Z"==T&&r.closePath()}};const WMF2PNG=(()=>{function t(){}return t.prototype.getBase64=async function(t){return new Promise((r,e)=>{const o=new FileReader;o.onload=(()=>{r(o.result)}),o.readAsDataURL(t)})},t.prototype.getPNG=async function(t){let r=(await this.getBase64(t)).replace(/.*;base64,/,""),e=window.atob(r);const o=new Uint8Array(e.length);for(let t=e.length-1;t>=0;--t)o[t]=e.charCodeAt(t);let n=new ToContext2D(0,1);FromWMF.Parse(o,n);let T=n.canvas,{width:a,height:E}=T,i=T.getContext("2d"),{data:l}=i.getImageData(0,0,a,E),c=4*a,s=E,f=[];for(let t=0;t<s;t++){let r=l.slice(t*c,(t+1)*c);f.push(r)}var M=document.createElement("canvas");M.width=a,M.height=E;let h=M.getContext("2d"),C=new Uint8ClampedArray(c*s),u=f.length;for(let t=u-1;t>=0;t--){let r=f[t];for(let e=0;e<r.length;e++)C[(u-t)*c+e]=r[e]}let O=new ImageData(C,a,E);h.putImageData(O,0,0);let A=M.toDataURL(),m=new Image;return m.src=A,m.width=a,m.height=E,m.outerHTML},new t})();