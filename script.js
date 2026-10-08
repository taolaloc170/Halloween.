const card = document.getElementById("card");
const surprise = document.getElementById("surprise");
const yes = document.getElementById("yes");
const no = document.getElementById("no");
const again = document.getElementById("again");
const question = document.getElementById("question");
const sub = document.getElementById("sub");

let noCount = 0;

function sound(freq=440, duration=.12){
  try{
    const C = window.AudioContext || window.webkitAudioContext;
    const ctx = new C(), osc = ctx.createOscillator(), gain = ctx.createGain();
    osc.frequency.value = freq; osc.type = "sine";
    gain.gain.setValueAtTime(.0001,ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(.08,ctx.currentTime+.01);
    gain.gain.exponentialRampToValueAtTime(.0001,ctx.currentTime+duration);
    osc.connect(gain); gain.connect(ctx.destination); osc.start(); osc.stop(ctx.currentTime+duration);
  }catch(e){}
}

function celebrate(){
  const f=document.createElement("div"); f.className="flash"; document.body.appendChild(f);
  setTimeout(()=>f.remove(),550);
  ["🎃","👻","🦇","✨","🕸️","🍬","🧡"].forEach((emoji,i)=>{
    for(let j=0;j<4;j++){
      const el=document.createElement("div"); el.className="confetti"; el.textContent=emoji;
      el.style.left=(5+Math.random()*90)+"vw"; el.style.top=(-10-Math.random()*20)+"vh";
      el.style.setProperty("--x",(Math.random()*240-120)+"px");
      el.style.animationDelay=(Math.random()*.35)+"s";
      document.body.appendChild(el); setTimeout(()=>el.remove(),2200);
    }
  });
  sound(660,.18); setTimeout(()=>sound(880,.22),130);
}

function openSurprise(){
  celebrate();
  setTimeout(()=>{
    card.style.display="none";
    surprise.classList.add("show");
  },280);
}

yes.addEventListener("click", openSurprise);

no.addEventListener("click",()=>{
  noCount++;
  sound(220,.1);
  if(noCount===1){
    question.textContent="Chắc chắn không muốn đón cùng mình sao? 👀";
    sub.textContent="Thử bấm lại nút kia xem...";
  }else if(noCount===2){
    question.textContent="Nút Không hình như đang chạy trốn rồi 😈";
    sub.textContent="Bạn còn cơ hội cuối đó!";
  }else{
    openSurprise();
  }
  if(noCount<3){
    const maxX=Math.min(110,window.innerWidth*.25);
    const maxY=45;
    no.style.transform=`translate(${(Math.random()*2-1)*maxX}px,${(Math.random()*2-1)*maxY}px)`;
  }
});

again.addEventListener("click",()=>{
  surprise.classList.remove("show");
  card.style.display="";
  no.style.transform="";
  noCount=0;
  question.textContent="Bạn có muốn đón Halloween cùng mình không?";
  sub.textContent="Có một bất ngờ nhỏ đang chờ bạn...";
});
