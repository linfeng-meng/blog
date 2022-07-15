class Landscape {
    constructor({
        el,
        background,
        width,
        height
    }) {
        this.ele = el
        this.ele.width = width;
        this.ele.height = height;
        this.ele.style.backgroundColor = background;
        this.canvas = el.getContext("2d")
        this.elements = []
        this.flower = {}
        this.grass = {}
        this.init()
    }
    init() {
        this.initFlowerDraw()
        this.initGlass()
        this.initBackdrop()
    }
    // 渐变天空色展示画面
    initBackdrop() {
        let b_grad = this.canvas.createLinearGradient(0, 0, 0, this.ele.height); //创建一个 渐变色线性对象
        b_grad.addColorStop(0, "#2a5caa");
        //定义渐变色颜色
        b_grad.addColorStop(1, "#afb4db");
        this.canvas.save();
        this.canvas.beginPath();
        this.canvas.fillStyle = b_grad
        this.canvas.fillRect(0, 0, this.ele.width, this.ele.height);
        this.canvas.restore();
        this.tree({
            x: this.ele.width / 2,
            y: this.ele.height - 10,
            radius: 15
        })
        let daisyNum = this.incRandom(10, 5)
        for (let i = 0; i < daisyNum; i++) {
            let height = this.incRandom(80, 50)
            new this.grass.daisy({
                x: this.ele.width * this.floatRandom(0, 1),
                y: this.ele.height,
                height: height,
                radius: height / 50
            })
        }
        for (let i = 0; i < this.ele.width; i++) {
            new this.grass.weed({
                x: i,
                y: this.ele.height,
            })
        }
    }
    //添加背景图像方式展示画面
    setBglmage(image) {
        let img = new Image();
        img.src = image
        img.onload = () => {
            this.initFlowerDraw()
            this.tree({
                x: this.ele.width / 2,
                y: this.ele.height - 100,
                radius: 15
            })
            this.initGlass()
            this.moon()
            new this.grass.weed({
                x: 100,
                y: 800,
            })
            new this.grass.daisy({
                x: 300,
                y: this.ele.height,
                radius: 2.5,
                height: 200
            })
        }
    }
    //月亮
    moon() {
        this.canvas.save();
        this.canvas.beginPath();
        this.canvas.moveTo(200, 200)
        this.canvas.quadraticCurveTo(265, 250, 180, 300);
        this.canvas.quadraticCurveTo(245, 235, 200, 200);
        this.canvas.fillStyle = 'rgba(255,255,0,0.8)'
        this.canvas.fill();
        this.canvas.restore();
    }
    //随机整数
    incRandom(s, e) {
        return Math.round(s + e * Math.random())
    }
    //随机浮点数
    floatRandom(min, max) {
        return (min + (max - min) * Math.random())
    }
    //树
    tree(param) {
        let that = this
        //this.canvas.globalCompositeOperation ="source-over";
        let tree = {
            branchs: [],
            x: param.x,
            y: param.y,
            radius: param.radius,
            grap: 1
        }
        //创建数据结构
        tree.setBranchStructure = function (branch, params) {
            tree.grap++
            if (!branch.length) {
                let pieces = that.incRandom(2, 2)
                for (let i = 0; i < pieces; i++) {
                    branch.push({
                        radius: params.radius,
                        pointArr: [],
                        x: params.x,
                        y: params.y,
                        inc: {
                            x: that.floatRandom(-1.5, 1.5),
                            y: that.floatRandom(3.5, 5),
                        },
                        branchs: []
                    })
                }
            }
            for (let i = 0; i < branch.length; i++) {

                let circulation = that.incRandom(50, 20)
                for (let j = 0; j < circulation; j++) {
                    if (branch[i].radius < 0.8) {
                        branch[i].isEnd = true
                        break
                    }
                    branch[i].radius *= 0.99
                    branch[i].x += branch[i].inc.x
                    branch[i].y -= branch[i].inc.y
	                let p = {
                        x: branch[i].x,
                        y: branch[i].y,
                        radius: branch[i].radius
                    }
                    let reg = 0.18 - (0.1 / tree.grap);
                    let angle = that.floatRandom(-reg, reg)
                    branch[i].inc.x = Math.cos(angle) * branch[i].inc.x - Math.sin(angle) * branch[i].inc.y;
                    branch[i].inc.y = Math.sin(angle) * branch[i].inc.x + Math.cos(angle) * branch[i].inc.y;
                    branch[i].pointArr.push(p)
                }
                if (branch[i].radius > 0.8) {
                    branch[i].branchs = []
                    let pieces = that.incRandom(1, 2)
                    for (let j = 0; j < pieces; j++) {
                        branch[i].branchs.push({
                            radius: branch[i].radius,
                            pointArr: [],
                            x: branch[i].x,
                            y: branch[i].y,
                            inc: {
                                x: branch[i].inc.x,
                                y: branch[i].inc.y
                            },
                            branchs: []
                        })
                    }
                    let a_params = {
                        x: branch[i].x,
                        y: branch[i].y,
                        radius: branch[i].radius
                    }
                    tree.setBranchStructure(branch[i].branchs, a_params)
                }
            }
        }
        tree.draw = function (branch) {
            for (let i = 0; i < branch.length; i++) {
                let points = branch[i].pointArr
                for (let j = 0; j < points.length; j++) {
                    that.canvas.save();
                    that.canvas.beginPath();
                    that.canvas.arc(points[j].x, points[j].y, points[j].radius, 0, 2 * Math.PI);
                    that.canvas.globalAlpha = 0.3
                    that.canvas.fillStyle = '#53261f'
                    that.canvas.fill();
                    that.canvas.restore();
                }
                if (branch[i].isEnd) {
                    let d_pearch = new that.flower.pearch({
                        x: points[points.length - 1].x,
                        y: points[points.length - 1].y,
                        radius: 6
                    })
                }
                tree.draw(branch[i].branchs)
            }
        }
        let t_params = {
            x: tree.x,
            y: tree.y,
            radius: tree.radius
        }
        tree.setBranchStructure(tree.branchs, t_params)
        tree.draw(tree.branchs)
    }
    //绘制花朵
    initFlowerDraw() {
        let that = this
        //绘制桃花
        that.flower.pearch = function (params) {
            this.params = {
                x: params.x,
                y: params.y,
                radius: params.radius,
                petals: [],
                feelers: []
            }
            this.setStructure = function () {
                //五朵花瓣轨迹设置
                for (let i = 0; i < 5; i++) {
                    let petalPoint = []
                    let angle = 72 * i
                    let point1_angle = angle - 24
                    let point1_radius = this.params.radius * 0.6
                    let point1_q_angle = angle - 45
                    let point1_q_radius = this.params.radius * 0.6
                    petalPoint.push({
                        point: {
                            x: this.params.x + point1_radius * Math.cos(point1_angle * Math.PI / 180),
                            y: this.params.y + point1_radius * Math.sin(point1_angle * Math.PI / 180)
                        },
                        qpoint: {
                            x: this.params.x + point1_q_radius * Math.cos(point1_q_angle * Math.PI / 180),
                            y: this.params.y + point1_q_radius * Math.sin(point1_q_angle * Math.PI / 180)
                        }
                    })
                    let point2_angle = angle + 24
                    let point2_radius = this.params.radius * 0.6
                    let point2_q_angle = angle
                    let point2_q_radius = this.params.radius
                    petalPoint.push({
                        point: {
                            x: this.params.x + point2_radius * Math.cos(point2_angle * Math.PI / 180),
                            y: this.params.y + point2_radius * Math.sin(point2_angle * Math.PI / 180)
                        },
                        qpoint: {
                            x: this.params.x + point2_q_radius * Math.cos(point2_q_angle * Math.PI / 180),
                            y: this.params.y + point2_q_radius * Math.sin(point2_q_angle * Math.PI / 180)
                        }
                    })
                    let point3_q_angle = angle + 45
                    let point3_q_radius = this.params.radius * 0.4
                    petalPoint.push({
                        point: {
                            x: this.params.x,
                            y: this.params.y
                        },
                        qpoint: {
                            x: this.params.x + point3_q_radius * Math.cos(point3_q_angle * Math.PI / 180),
                            y: this.params.y + point3_q_radius * Math.sin(point3_q_angle * Math.PI / 180)
                        }
                    })
                    this.params.petals.push(petalPoint)
                }
                let feelersNum = that.incRandom(18, 22)
                for (let i = 0; i < feelersNum; i++) {
                    let angle = that.floatRandom(0, 1) * 360
                    let l = this.params.radius * that.floatRandom(0.1, 0.4)
                    let q_angle = angle - 10
                    this.params.feelers.push({
                        point: {
                            x: this.params.x + l * Math.cos(angle * Math.PI / 180),
                            y: this.params.y + l * Math.sin(angle * Math.Pl / 180)
                        },
                        qpoint: {
                            x: this.params.x + l * 0.6 * Math.cos(q_angle * Math.PI / 180),
                            y: this.params.y + l * 0.6 * Math.sin(q_angle * Math.PI / 180)
                        }
                    })
                }
            }
            this.draw = function () {
                let grad = that.canvas.createRadialGradient(this.params.x, this.params.y, this.params.radius * 0.2,
                    this.params.x, this.params.y, this.params.radius); //创建一个渐变色线性对象
                grad.addColorStop(0, "#f05b72");
                //定义渐变色颜色
                grad.addColorStop(1, "#feeeed");
                let s_grad = that.canvas.createRadialGradient(this.params.x, this.params.y, this.params.radius * 0.1,
                    this.params.x, this.params.y, this.params.radius); //创建一个 渐变色线性对象
                s_grad.addColorStop(0, "rgba(255,131,250,0.26)");
                //定义渐变色颜色
                s_grad.addColorStop(1, "rgba(205,0,205,0.26)");
                for (let i = 0; i < this.params.petals.length; i++) {
                    let c_petal = this.params.petals[i]
                    that.canvas.save();
                    that.canvas.beginPath();
                    that.canvas.moveTo(this.params.x, this.params.y);
                    for (let p = 0; p < c_petal.length; p++) {
                        that.canvas.quadraticCurveTo(c_petal[p].qpoint.x, c_petal[p].qpoint.y, c_petal[p].point.x,
                            c_petal[p].point.y)
                    }
                    that.canvas.fillStyle = grad
                    that.canvas.strokeStyle = s_grad
                    that.canvas.fill();
                    //that.canvas.stroke();
                    that.canvas.restore();
                }
                let grad2 = that.canvas.createRadialGradient(params.x, params.y, params.radius * 0.1, params.x,
                    params.y, params.radius * 0.3); //创建一个渐变色线性对象
                grad2.addColorStop(0, "#8B008B");
                //定义渐变色颜色
                grad2.addColorStop(1, "#8B2252");
                for (let i = 0; i < this.params.feelers.length; i++) {
                    that.canvas.save();
                    that.canvas.beginPath();
                    that.canvas.moveTo(this.params.feelers[i].point.x, this.params.feelers[i].point.y);
                    that.canvas.quadraticCurveTo(this.params.feelers[i].qpoint.x,
                        this.params.feelers[i].qpoint.y, this.params.x, this.params.y);
                    that.canvas.strokeStyle = '#faa755'
                    that.canvas.lineWidth = 0.2
                    that.canvas.stroke();
                    that.canvas.restore();
                    that.canvas.save();
                    that.canvas.beginPath();
                    that.canvas.arc(this.params.feelers[i].point.x, this.params.feelers[i].point.y, 0.7, 0, 2 * Math.PI);
                    that.canvas.fillStyle = '#905a3d'
                    that.canvas.fill();
                    that.canvas.restore();
                }
            }
            this.setStructure()
            this.draw()
        }
        //绘制邹菊
        that.flower.daisy = function (params) {
            this.params = {
                x: params.x,
                y: params.y,
                radius: params.radius,
                petals: [],
                feelers: []
            }
            this.setDaisyStuct = function () {
                let petalMum = that.incRandom(18, 22)
                let avg_angle = 360 / petalMum

                for (let i = 0; i < petalMum; i++) {
                    let point = {}
                    let angle = avg_angle * i
                    point.start = {
                        x: this.params.x + this.params.radius * 0.2 * Math.cos(angle * Math.PI / 180),
                        y: this.params.y + this.params.radius * 0.2 * Math.sin(angle * Math.PI / 180)
                    }
                    point.left_q = {
                        x: point.start.x + this.params.radius * that.floatRandom(0.6, 0.8) * Math.cos((angle - that.floatRandom(8, 10)) * Math.PI / 180),
                        y: point.start.y + this.params.radius * that.floatRandom(0.6, 0.8) * Math.sin((angle - that.floatRandom(8, 10)) * Math.PI / 180)
                    }
                    point.top = {
                        x: point.start.x + this.params.radius * that.floatRandom(0.7, 0.8) * Math.cos(angle * Math.PI / 180),
                        y: point.start.y + this.params.radius * that.floatRandom(0.7, 0.8) * Math.sin(angle * Math.PI / 180)
                    }
                    point.right_q = {
                        x: point.start.x + this.params.radius * that.floatRandom(0.6, 0.8) * Math.cos((angle + that.floatRandom(8, 10)) * Math.PI / 180),
                        y: point.start.y + this.params.radius * that.floatRandom(0.6, 0.8) * Math.sin((angle + that.floatRandom(8, 10)) * Math.PI / 180)
                    }
                    point.end = {
                        X: point.start.X,
                        y: point.start.y
                    }
                    this.params.petals.push(point)
                }
                let feelerMum = that.incRandom(48, 52)
                for (let i = 0; i < feelerMum; i++) {
                    let angle = 360 * Math.random()
                    let radius = this.params.radius * that.floatRandom(0.01, 0.22)
                    let point = {
                        x: this.params.x + radius * Math.cos(angle * Math.PI / 180),
                        y: this.params.y + radius * Math.sin(angle * Math.PI / 180),
                        radius: this.params.radius * that.floatRandom(0.02, 0.03)
                    }
                    this.params.feelers.push(point)
                }
            }
            this.draw = function () {
                let grad = that.canvas.createRadialGradient(this.params.x, this.params.y, this.params.radius * 0.3,
                    this.params.x, this.params.y, this.params.radius); //创建一个 渐变色线性对象

                grad.addColorStop(0, "#FF1493");
                //定义渐变色颜色
                grad.addColorStop(1, "#FF69B4");
                for (let i = 0; i < this.params.petals.length; i++) {
                    let c_petal = this.params.petals[i]
                    that.canvas.save();
                    that.canvas.beginPath();
                    that.canvas.moveTo(c_petal.start.x, c_petal.start.y);
                    that.canvas.quadraticCurveTo(c_petal.left_q.x, c_petal.left_q.y, c_petal.top.x, c_petal.top.y)
                    that.canvas.quadraticCurveTo(c_petal.right_q.x, c_petal.right_q.y, c_petal.end.x, c_petal.end.y)
                    that.canvas.fillStyle = grad
                    that.canvas.strokeStyle = 'rgba(176,48,96,0.6)'
                    that.canvas.fill();
                    that.canvas.stroke();
                    that.canvas.restore();
                }
                let c_grad = that.canvas.createRadialGradient(this.params.x, this.params.y, this.params.radius * 0,
                    this.params.x, this.params.y,
                    this.params.radius * 0.25); //创建一个 渐变色线性对象
                c_grad.addColorStop(0, "#fcaf17");
                //定义渐变色颜色
                c_grad.addColorStop(1, "#c88400");
                that.canvas.save();
                that.canvas.beginPath();
                that.canvas.fillStyle = c_grad
                that.canvas.arc(this.params.x, this.params.y, 0.25 * this.params.radius, 0, 2 * Math.PI);
                that.canvas.fill();
                that.canvas.restore();
                for (let i = 0; i < this.params.feelers.length; i++) {
                    let grad2 = that.canvas.createRadialGradient(this.params.feelers[i].x, this.params.feelers[i].y, 0,
                        this.params.feelers[i].x, this.params.feelers[i].y, this.params.feelers[i].radius); //创建一个 渐变色线性对象
                    grad2.addColorStop(0, "#B8860B");
                    //定义渐变色颜色
                    grad2.addColorStop(1, "#FFA500");
                    that.canvas.save();
                    that.canvas.beginPath();
                    that.canvas.fillStyle = grad2
                    that.canvas.arc(this.params.feelers[i].x, this.params.feelers[i].y, this.params.feelers[i].radius, 0, 2 * Math.PI);
                    that.canvas.fill();
                    //that.canvas.stroke();
                    that.canvas.restore();
                }
            }
            this.setDaisyStuct()
            this.draw()
        }
    }
    //草
    initGlass() {
        let that = this
        that.grass.daisy = function (params) {
            this.params = {
                x: params.x,
                y: params.y,
                height: params.height,
                radius: params.radius,
                trunk: [],
                leafs: []
            }
            this.setDaisyStruct = function () {
                let start = {
                    x: this.params.x,
                    y: this.params.y
                }
                for (let i = 0; i < this.params.height; i++) {
                    start.x += that.floatRandom(-0.3, 0.3)
                    start.y -= 1
                    this.params.radius *= 0.998
                    let p = {
                        x: start.x,
                        y: start.y,
                        radius: this.params.radius
                    }

                    this.params.trunk.push(p)
                }
                let init_num = Math.round(this.params.height / 24)
                let leafNum = that.incRandom(init_num, 1)
                let gap = this.params.height / leafNum
                for (let i = 1; i < leafNum; i++) {
                    let s_point = {
                        x: this.params.x,
                        y: this.params.y - (gap * i + (gap / 4) * that.floatRandom(-1, 1))
                    }
                    let angle = that.floatRandom(150, 190)
                    if (i % 2 == 0) {
                        angle = that.floatRandom(-10, 30)
                    }
                    let init_len = Math.round(this.params.height / 4)
                    let len = that.incRandom(init_len, init_len / 2)
                    let e_point = {
                        x: s_point.x + len * Math.cos(angle * Math.PI / 180),
                        y: s_point.y + len * Math.sin(angle * Math.PI / 180)
                    }
                    let left_q = {
                        x: s_point.x + len * that.floatRandom(0.9, 1) * Math.cos((angle - 10) * Math.PI / 180),
                        y: s_point.y + len * that.floatRandom(0.9, 1) * Math.sin((angle - 10) * Math.PI / 180)
                    }
                    let right_q = {
                        x: s_point.x + len * that.floatRandom(0.9, 1) * Math.cos((angle + 10) * Math.PI / 180),
                        y: s_point.y + len * that.floatRandom(0.9, 1) * Math.sin((angle + 10) * Math.PI / 180)
                    }
                    this.params.leafs.push({
                        start: s_point,
                        left_q: left_q,
                        end: e_point,
                        right_q: right_q,
                    })
                }
            }
            this.draw = function () {
                for (let i = 0; i < this.params.trunk.length; i++) {
                    that.canvas.save();
                    that.canvas.beginPath();
                    that.canvas.fillStyle = 'rgba(139,119,101,0.7)'
                    that.canvas.arc(this.params.trunk[i].x, this.params.trunk[i].y, this.params.trunk[i].radius, 0, 2 * Math.PI);
                    that.canvas.fill();
                    that.canvas.restore();
                }
                for (let i = 0; i < this.params.leafs.length; i++) {
                    let leaf = this.params.leafs[i]
                    that.canvas.save();
                    that.canvas.beginPath();
                    that.canvas.fillStyle = '#556B2F'
                    that.canvas.moveTo(leaf.start.x, leaf.start.y)
                    that.canvas.quadraticCurveTo(leaf.left_q.x, leaf.left_q.y, leaf.end.x, leaf.end.y)
                    that.canvas.quadraticCurveTo(leaf.right_q.x, leaf.right_q.y, leaf.start.x, leaf.start.y)
                    that.canvas.fill();
                    that.canvas.restore();
                }
                new that.flower.daisy({
                    x: this.params.trunk[this.params.trunk.length - 1].x,
                    y: this.params.trunk[this.params.trunk.length - 1].y,
                    radius: this.params.height / 6
                })
            }
            this.setDaisyStruct()
            this.draw()
        }
        that.grass.weed = function (params) {
            let angle = that.floatRandom(250, 290)
            let len = that.floatRandom(20, 50)
            let end = {
                x: params.x + len * Math.cos(angle *
                    Math.PI / 180),
                y: params.y + len * Math.sin(angle *
                    Math.PI / 180)
            }
            let left_q = {
                x: params.x + len * 0.5 * Math.cos((angle - 10) * Math.PI / 180),
                y: params.y + len * 0.5 * Math.sin((angle - 10) * Math.PI / 180)
            }
            let right_q = {
                x: params.x + len * 0.5 * Math.cos((angle + 10) * Math.PI / 180),
                y: params.y + len * 0.5 * Math.sin((angle + 10) * Math.PI / 180)
            }
            that.canvas.save();
            that.canvas.beginPath();
            that.canvas.fillStyle = '#556B2F'
            that.canvas.moveTo(params.x - 2, params.y)
            that.canvas.quadraticCurveTo(left_q.x, left_q.y, end.x, end.y)
            that.canvas.quadraticCurveTo(right_q.x, right_q.y, params.x + 2, params.y)
            that.canvas.fill();
            that.canvas.restore();
        }
    }
}
const getAngle = ({ x: x1, y: y1 }, { x: x2, y: y2 })=> {
    const dot = x1 * x2 + y1 * y2
    const det = x1 * y2 - y1 * x2
    const angle = Math.atan2(det, dot) / Math.PI* 180
    return (angle + 360) % 360
}
export default Landscape