const { Member } = require("../model/Member");

exports.get_visitors = (req, res) => {
	Visitor.findAll().then((result) => {
		// console.log("result : ", result);
		// console.log("index");
		res.render("index", { data: result });
	});
	// select name, comment from visitor where id= ???
};
// exports.post_comment = (req,res) => {
//     // insert into visitor (name, comment) values(req.body.name, req.body.comment);
//     var data = {
//         name: req.body.name,
//         comment: req.body.comment
//     }
//     Visitor.create(data)
//     .then((result)=>{
//         console.log( result );
//         res.send({ id: result.id });
//     })
// }
// exports.get_visitor = (req,res) => {
//     Visitor.findOne({
//         attributes: [ 'id', 'name', 'comment' ],
//         where: { id: req.query.id }
//     }).then((result)=>{
//         console.log( "result : ", result );
//         res.send( { result : result } );
//     })
//     // select name, comment form visitor where id = req.query.id limit 1
// }
// exports.patch_comment = (req,res) => {
//     // update visitor set name=req.body.name, comment=req.body.comment where id=req.body.id;
//     var data = {
//         name: req.body.name,
//         comment: req.body.comment
//     }
//     Visitor.update(data, {
//         where: {id: req.body.id+1}
//     }).then((result)=>{
//         console.log(result);
//         res.send("수정 성공");
//     })
// }
// exports.delete_comment = (req,res) => {
//     Visitor.destroy({
//         where : { id: req.body.id }
//     }).then((result)=>{
//         console.log( result );
//         res.send( "삭제 성공" );
//     })
//     //delete from visitor where id = req.body.id
// }
