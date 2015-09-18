process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server/app');
var Item = require('../server/models/items');
var should = chai.should();
chai.use(chaiHttp);


describe("Items", function() {

  Item.collection.drop();
  var id;


  beforeEach(function(done) {
    var newItem = new Item({
      name: "mop",
      location: "closet"
    });
    id = newItem._id;
    newItem.save(function(err) {
      done();
    });
  });
  afterEach(function(done){
    Item.collection.drop();
    done();
  });


  it('should list ALL items on /items GET',
    function(done) {
      chai.request(server)
      .get('/items')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body[0].name.should.be.a('string');
        res.body[0].name.should.equal('mop');
        res.body[0].location.should.be.a('string');
        res.body[0].location.should.equal('closet');
        done();
      });
    });

  it('should list a SINGLE item on /item/<id> GET',
    function(done) {
      chai.request(server)
      .get('/items/' + id)
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        console.log(res.body);
        console.log(id);
        res.body.should.be.a('array');
        res.body[0].should.be.a('object');
        res.body[0].name.should.be.a('string');
        res.body[0].name.should.be.equal('mop');
        res.body[0].location.should.be.a('string');
        res.body[0].location.should.be.equal('closet');
        done();
      });
      });


  it('should add a SINGLE item on /items POST',
    function(done) {
      chai.request(server)
      .post('/items/chair/livingroom')
      .end(function(err,res) {
        res.should.have.status(200);
        res.should.be.json;
        // res.body.should.be.a('array');
        res.body.should.be.a('object');
        res.body.name.should.be.a('string');
        res.body.name.should.be.equal('chair');
        res.body.location.should.be.a('string');
        res.body.location.should.be.equal('livingroom');
        done();
      });
    });

  it('should update a SINGLE item on /item/<id> PUT',
    function(done) {
      chai.request(server)
      .put('/items/' + id + '/broom/closet')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        console.log(res.body);
        res.body.should.be.a('object');
        res.body.name.should.be.a('string');
        res.body.name.should.be.equal('broom');
        res.body.location.should.be.a('string');
        res.body.location.should.be.equal('closet');
        done();
      });
      });


  it('should delete a SINGLE item on /item/<id> DELETE',
function(done) {
      chai.request(server)
      .delete('/items/' + id)
      .end(function(err, res) {
        console.log(res.body);
        res.should.have.status(200);
        res.should.be.json;
        console.log(res.body);
        res.body.should.be.a('object');
        done();
      });
    });



}); //close describe
