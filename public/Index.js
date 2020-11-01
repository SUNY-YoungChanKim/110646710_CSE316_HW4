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
var searchedarray=new Array();
var listedarray=new Array();
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

function load()
{
    db.collection("Courses").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            var x=doc.data();
            t.push(new Course(x.Subj,x.crs,x.cmp,x.SCtn,x.Days,x.StartTime,x.EndTime,x.MtgS,x.MtgE,x.Duration,x.Instruction,x.Building,x.Room,x.Instructor,
                x.EnrlCap,x.Waitap,x.Cmbnd,x.Des));
            // doc.data() is never undefined for query doc snapshots
        })
    });

    db.collection("Myschedule").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            var x=doc.data();
            listedarray.push(new Course(x.Subj,x.crs,x.cmp,x.SCtn,x.Days,x.StartTime,x.EndTime,x.MtgS,x.MtgE,x.Duration,x.Instruction,x.Building,x.Room,x.Instructor,
                x.EnrlCap,x.Waitap,x.Cmbnd,x.Des));
            // doc.data() is never undefined for query doc snapshots
        })
    });
}
function searchUpdate()
{   
    var selected_index = document.getElementById("SO").value;
    // 선택된 index의 value를 찾고 
    searchedarray=new Array();
    document.getElementById("Searchbar").value
        for(var i=0;i<t.length;i++){
            var searchval;
            if(selected_index=="AF")
            {
                searchval = t[i].Subj+" "+t[i].crs+" " + t[i].cmp+ " " + t[i].SCtn + " " + t[i].Days+ " " + t[i].StartTime + " "+ t[i].EndTime + " "+ t[i].MtgS+  " " +
                t[i].MtgE + " " + t[i].Duration +" " + t[i].Instruction + " " + t[i].Building + " " + t[i].Room + " " + t[i].Instructor+ " " + " " +t[i].EnrlCap + " " +
                t[i].Waitap + " " + t[i].Cmbnd + " " + t[i].des;
            }
            else if(selected_index=="TT")
            {
                searchval= t[i].des;
            }
            else if(selected_index=="CN")
            {
                searchval=t[i].crs;
            }
            else if(selected_index=="DY")
            {
                searchval= t[i].Days
            }
            else if(selected_index=="TI")
            {
                searchval= + t[i].StartTime + " ", t[i].EndTime ;
            }


            if(searchval.indexOf(document.getElementById("Searchbar").value)!=-1)
            {
                searchedarray.push(t[i]);
             }
            // doc.data() is never undefined for query doc snapshots
        }
        searchedlistupdate();


}

function searchedlistupdate()
{
    var dt=document.getElementById("Ttable");
    if(dt!=null)dt.remove();
    var ttable=document.createElement("TABLE");
    ttable.id="Ttable";
    var ttrow;
    var ttd;
    var id=0;
    for(var i=0;i<searchedarray.length;i++)
    {

        ttrow=document.createElement("TR");
        ttd=document.createElement("TD");
        ttd.innerText=id++;
        ttd.className="tI";
        ttrow.appendChild(ttd);

        ttd=document.createElement("TD");
        ttd.innerHTML="<b>"+searchedarray[i].Subj+searchedarray[i].crs+"-"+searchedarray[i].SCtn+searchedarray[i].cmp+"</b>"+"<br>"+"Same<br>Courses";
        ttd.className="tl";
        ttrow.appendChild(ttd);


        ttd=document.createElement("TD");
        ttd.innerHTML="<u>"+searchedarray[i].Des+"</u><br>"+"By:<u>"+searchedarray[i].Instructor+"</u>   <b>Room:</b>"+ searchedarray[i].Room+"<br><b>"+
        searchedarray[i].cmp+"</b>: "+searchedarray[i].Days+" "+searchedarray[i].StartTime+"-"+searchedarray[i].EndTime;
        ttd.className="tm";
        ttrow.appendChild(ttd);

        ttd=document.createElement("TD");

        ttd.innerHTML="<b>Enrolled: </b>"+searchedarray[i].EnrlCap +"<br><b>Waiting: </b>"+searchedarray[i].Waitap+"<br>";
        ttd.className="tr";
        if(searchedarray[i].EnrlCap!=0)
        {
            var tb=document.createElement("button");
            tb.className="Addbutton";
            tb.innerHTML="Add"
            tb.value=i;
            tb.onclick=function(){scheduleadd(this);};
            ttd.appendChild(tb);
        }
        ttrow.appendChild(ttd);
        if(i%2==0)ttrow.style.backgroundColor='lightgray';
        ttable.appendChild(ttrow);
    }
    document.getElementById("middle").appendChild(ttable);

}
function tominute(T)
{
    var data=T.split(" ");
    var hourandMinute=data[0].split(":");
    var ampm=data[1];
    var hour;
    var minute;

    if(ampm=="PM")
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
function scheduleadd(obj)
{
    var stime=tominute(searchedarray[obj.value].StartTime);
    var etime=tominute(searchedarray[obj.value].EndTime);



    if(listedarray.length!=0)
    {
        for(var i=0;i<listedarray.length;i++)
        {

            if((tominute(listedarray[i].StartTime)<=stime&&stime<=tominute(listedarray[i].EndTime))||
                (tominute(listedarray[i].StartTime)<=etime&&etime<=tominute(listedarray[i].EndTime)))
                {
                    alert("You have already enrolled other class at that time");
                    return;
                }
        }
    }

        db.collection("Myschedule").doc(searchedarray[obj.value].Subj+searchedarray[obj.value].crs+"-"+searchedarray[obj.value].SCtn+searchedarray[obj.value].cmp).set({
            Subj: searchedarray[obj.value].Subj,
            crs: searchedarray[obj.value].crs,
            cmp: searchedarray[obj.value].cmp,
            SCtn: searchedarray[obj.value].SCtn,
            Days: searchedarray[obj.value].Days,
            StartTime: searchedarray[obj.value].StartTime,
            EndTime: searchedarray[obj.value].EndTime,
            MtgS: searchedarray[obj.value].MtgS,
            MtgE: searchedarray[obj.value].MtgE,
            Duration: searchedarray[obj.value].Duration,
            Instruction: searchedarray[obj.value].Instruction,
            Room:searchedarray[obj.value].Room,
            Instructor:searchedarray[obj.value].Instructor,
            EnrlCap:searchedarray[obj.value].EnrlCap,
            Waitap:searchedarray[obj.value].Waitap,
            Cmbnd:searchedarray[obj.value].Cmbnd,
            Des:searchedarray[obj.value].Des
        }).then(function() {
            load();
            alert("Succed!");
        })

}