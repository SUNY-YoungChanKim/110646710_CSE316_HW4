// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyBxe3R_taEZ-zvtRJGF5E3jjLv1YXqyv7w",
    authDomain: "cse316-4cfec.firebaseapp.com",
    databaseURL: "https://cse316-4cfec.firebaseio.com",
    projectId: "cse316-4cfec",
    storageBucket: "cse316-4cfec.appspot.com",
    messagingSenderId: "818019576825",
    appId: "1:818019576825:web:dee515c70bbe2101ff6b28",
    measurementId: "G-8CHXTRVRV0"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.firestore();
var t=new Array();
var week=new Array(5);
for(var i=0;i<week.length;i++)week[i]=new Array();
window.addEventListener('DOMContentLoaded', function()
{
    load();



});

class Course {
    // PersonType 생성자와 동일합니다.
    constructor(Subj,CRS,cmp,SCtn,Days,StartTime,EndTime,MtgS,MtgE,Duration,Instruction,Builing,Room,Instructor,EnrlCap,Waitap,Cmbnd,Des) {
        this.Subj=Subj;
        this.crs=CRS;
        this.cmp=cmp;
        this.SCtn=SCtn;
        this.Days=Days;
        this.StartTime=StartTime;
        this.EndTime=EndTime;
        this.MtgS=MtgS;
        this.MtgE=MtgE;
        this.Duration=Duration;
        this.Instruction=Instruction;
        this.Building=Builing;
        this.Room=Room;
        this.Instructor=Instructor;
        this.EnrlCap=EnrlCap;
        this.Waitap=Waitap;
        this.Cmbnd=Cmbnd;
        this.Des=Des;

    }
}
function tominute(T)
{
    var data=T.split(" ");
    var hourandMinute=data[0].split(":");
    var ampm=data[1];
    var hour;
    var minute;

    if(ampm=="PM"&&hourandMinute[0]!="12")
    {
        hour=parseInt(hourandMinute[0])+12;
    }
    else 
    {
        hour=parseInt(hourandMinute[0]);
    }
    minute=hour*60+parseInt(hourandMinute[1]);
    return minute;
}
function load()
{
    db.collection("Myschedule").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            var x=doc.data();
            t.push(new Course(x.Subj,x.crs,x.cmp,x.SCtn,x.Days,x.StartTime,x.EndTime,x.MtgS,x.MtgE,x.Duration,x.Instruction,x.Building,x.Room,x.Instructor,
                x.EnrlCap,x.Waitap,x.Cmbnd,x.Des));
        });
        for(var i=0;i<t.length;i++)
        {
            var text=t[i].Days;
            console.log(text);
            while(text!="")
            {
                if(t[i].Days.indexOf("M")!=-1)
                {
                    week[0].push(t[i]);
                    text=text.replace("M","");
                }
                if(t[i].Days.indexOf("TU")!=-1)
                {
                    week[1].push(t[i]);
                    text=text.replace("TU","");
                }
                if(t[i].Days.indexOf("W")!=-1)
                {
                    week[2].push(t[i]);
                    text=text.replace("W","");
                }
                if(t[i].Days.indexOf("TH")!=-1)
                {
                    week[3].push(t[i]);
                    text=text.replace("TH","");
                }
                if(t[i].Days.indexOf("F")!=-1)
                {
                    week[4].push(t[i]);
                    text=text.replace("F","");
                }
         }
        }
        var c;
        for(var i=0;i<week.length;i++)
        {
            for(var j=0;j<week[i].length;j++)
            {
                for(var k=0;k<week[i].length-1;k++)
                {
                    if(tominute(week[i][k].StartTime)>tominute(week[i][k+1].StartTime))
                    {
                        c=week[i][k+1];
                        week[i][k+1]=week[i][k];
                        week[i][k]=c;
                    }
                }
            }
        }
        var maxdepth=0;
        for(var i=0;i<week.length;i++)
            if(maxdepth<week[i].length)maxdepth=week[i].length;

        for(var i=0;i<maxdepth;i++)
        {
            var temp=document.createElement("TR");
            var tempd;

            tempd=document.createElement("TD");
            if(week[0].length>i)
            {
                tempd.className="slot";
                tempd.innerHTML="<div class='schedule'> <div class='time'>" + week[0][i].StartTime+
                "</div> <div class='className'>"+week[0][i].Subj+week[0][i].crs+"-"+week[0][i].SCtn+week[0][i].cmp+"</div>"+
                week[0][i].Des+"</div>";
                tempd.id=week[0][i].Subj+week[0][i].crs+"-"+week[0][i].SCtn+week[0][i].cmp;
                tempd.onclick=function(){remove(this);};
            }
            temp.appendChild(tempd);

            tempd=document.createElement("TD");
            if(week[1].length>i)
            {
                tempd.className="slot";
                tempd.innerHTML="<div class='schedule'> <div class='time'>" + week[1][i].StartTime+
                "</div> <div class='className'>"+week[1][i].Subj+week[1][i].crs+"-"+week[1][i].SCtn+week[1][i].cmp+"</div>"+
                week[1][i].Des+"</div>";
                tempd.id=week[1][i].Subj+week[1][i].crs+"-"+week[1][i].SCtn+week[1][i].cmp;
                tempd.onclick=function(){remove(this);};
            }

            temp.appendChild(tempd);

            tempd=document.createElement("TD");
            if(week[2].length>i)
            {
                tempd.className="slot";
                tempd.innerHTML="<div class='schedule'> <div class='time'>" + week[2][i].StartTime+
                "</div> <div class='className'>"+week[2][i].Subj+week[2][i].crs+"-"+week[2][i].SCtn+week[2][i].cmp+"</div>"+
                week[2][i].Des+"</div>";
                tempd.id=week[2][i].Subj+week[2][i].crs+"-"+week[2][i].SCtn+week[2][i].cmp;
                tempd.onclick=function(){remove(this);};
            }
            temp.appendChild(tempd);

            tempd=document.createElement("TD");
            if(week[3].length>i)
            {
                tempd.className="slot";
                tempd.innerHTML="<div class='schedule'> <div class='time'>" + week[3][i].StartTime+
                "</div> <div class='className'>"+week[3][i].Subj+week[3][i].crs+"-"+week[3][i].SCtn+week[3][i].cmp+"</div>"+
                week[3][i].Des+"</div>";
                tempd.id=week[3][i].Subj+week[3][i].crs+"-"+week[3][i].SCtn+week[3][i].cmp;
                tempd.onclick=function(){remove(this);};
            }
            temp.appendChild(tempd);

            tempd=document.createElement("TD");
            if(week[4].length>i)
            {
                tempd.className="slot";
                tempd.innerHTML="<div class='schedule'> <div class='time'>" + week[4][i].StartTime+
                "</div> <div class='className'>"+week[4][i].Subj+week[4][i].crs+"-"+week[4][i].SCtn+week[4][i].cmp+"</div>"+
                week[4][i].Des+"</div>";
                tempd.id=week[4][i].Subj+week[4][i].crs+"-"+week[4][i].SCtn+week[4][i].cmp;
                tempd.onclick=function(){remove(this);};
            }
            temp.appendChild(tempd);
            tempd=document.createElement("TD");
            temp.appendChild(tempd);
            tempd=document.createElement("TD");
            temp.appendChild(tempd);
            document.getElementById("mainTable").appendChild(temp);
        }
        console.log(week);
    });
}
function remove(obj)
{
    db.collection("Myschedule").doc(obj.id).delete().then(function() {
        alert(" successfully deleted!");
        window.location.reload();
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}