import express from "express";
import bodyParser  from "body-parser";
const app = express();
const port = process.env.PORT || 3001;

app.use(express.static("public"));  
app.use(bodyParser.urlencoded({extended: true}));

let posts = [];

function Post(title, content) {
    this.title = title;
    this.content = content;
    this.rawDate = new Date();
    this.date = this.rawDate.toLocaleString();
}

function addPost(title, content) {
    let post = new Post(title, content);
    posts.push(post);
}

// Delete Post
function deletePost(index) {
    posts.splice(index, 1);
}
// Edit Post
function editPost(index, title, content) {
    posts[index] = new Post(title, content);
}




app.get("/",(req,res)=>{
    res.render("home.ejs",{posts: posts});
});

app.get("/view",(req,res)=>{
    res.render("view.ejs");
});



app.get("/view/:id",(req,res)=>{
    let index = req.params.id;
    let post = posts[index];
    res.render("view.ejs",{postId: index,title: post.title,content: post.content });
});

// Delete Post
app.post("/delete", (req, res) => {
    let index = req.body["postId"];
    deletePost(index);
    res.redirect("/");
});

// Edit Post Page
app.get("/edit/:id", (req, res) => {
    let index = req.params.id;
    let post = posts[index];
    res.render("create.ejs", {postId: index, title: post.title, content: post.content});
});

// Update
app.post("/update", (req, res) => {
    let title = req.body["title"];
    let content = req.body["content"];
    let index = req.body["index"];
    editPost(index, title, content);
    res.redirect("/");
});

// Create Post Page
app.get("/create", (req, res) => {
    res.render("create.ejs");
});

// Save Post
app.post("/save", (req, res) => {
    let title = req.body["title"];
    let content = req.body["content"];
    
    addPost(title, content);
    res.redirect("/");
});


app.listen(port,()=>{
    addPost("Yoshikage Kira",`My name is Yoshikage Kira. I'm 33 years old. My house is in the northeast section of Morioh, where all the villas are, and I am not married. I work as an employee for the Kame Yu department stores, and I get home every day by 8 PM at the latest. I don't smoke, but I occasionally drink. I'm in bed by 11 PM, and make sure I get eight hours of sleep, no matter what. After having a glass of warm milk and doing about twenty minutes of stretches before going to bed, I usually have no problems sleeping until morning. Just like a baby, I wake up without any fatigue or stress in the morning. I was told there were no issues at my last check-up. I'm trying to explain that I'm a person who wishes to live a very quiet life. I take care not to trouble myself with any enemies, like winning and losing, that would cause me to lose sleep at night. That is how I deal with society, and I know that is what brings me happiness. Although, if I were to fight I wouldn't lose to anyone.`   );
    addPost("Walter White",`My name is Walter Hartwell White. I live at 308 Negra Arroyo Lane, Albuquerque, New Mexico, 87104. This is my confession. If you're watching this tape, I'm probably dead, murdered by my brother-in-law Hank Schrader. Hank has been building a Virtual Youtuber empire for over a year now and using me as his recruiter. Shortly after my 50th birthday, Hank came  to me with a rather, shocking proposition. He asked that I use my Live2D knowledge to recruit talents, which he would then hire using his connections in the Japanese utaite world. Connections that he made through his career with Niconico. I was... astounded, I... I always thought that Hank was a very moral man and I was... thrown, confused, but I was also particularly vulnerable at the time, something he knew and took advantage of. I was reeling from a cancer diagnosis that was poised to bankrupt my family. Hank took me on a ride along, and showed me just how much money even a small indie channel could make. And I was weak. I didn't want my family to go into financial ruin so I agreed. Every day, I think back at that moment with regret. I quickly realized that I was in way over my head, and Hank had a partner, a man named Motoaki "Yagoo" Tanigo, a businessman. Hank essentially sold me into servitude to this man, and when I tried to quit, Yagoo threatened my family. I didn't know where to turn. Eventually, Hank and Yagoo had a falling out. From what I can gather, Hank was always pushing for a greater share of the business, to which Yagoo flatly refused to give him, and things escalated. Yagoo was able to arrange, uh I guess I guess you call it a "hit" on my brother-in-law, and failed, but Hank was seriously injured, and I wound up paying his medical bills which amounted to a little over $177,000. Upon recovery, Hank was bent on revenge, working with a man named Riku Tazumi , he plotted to kill Yagoo, and did so. In fact, the bomb that he used was built by me, and he gave me no option in it. I have often contemplated suicide, but I'm a coward. I wanted to go to the police, but I was frightened.`);
    console.log(`Server running on port ${port}.`);
})
