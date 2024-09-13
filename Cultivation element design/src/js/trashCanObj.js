class TrashCanObj {
    constructor(x,y,imgObj, frame) {
        this.x = x;
        this.y = y;
        this.img = imgObj; // reference to an image object
        this.frame = { width: 60, height: 60 }
    }




    drawMe(){
        image(this.img, this.x, this.y, this.frame.width, this.frame.height);
        //print("trash here..", this.x, this.y);
        //rect(this.x, this.y, this.frame.width, this.frame.height);
    }




}









