var connection =  new require('./kafka/Connection');
//topics files
//var signin = require('./services/signin.js');
// var Books = require('./services/books.js');
// var Books = require('./services/books.js');
var Signup = require('./services/signup.js.js');
var Restaurants = require('./services/restaurants.js.js');
var RestaurantSections = require('./services/restaurantsections.js.js');
var SectionsMenu = require('./services/sectionsmenu.js.js');
var OrderList = require('./services/orderlist.js.js');
var UserOrder = require('./services/userorder.js.js');
var PastOrderList = require('./services/pastuserorder.js.js');
var PostMessage = require('./services/postmessage.js.js');
var MessageDetails = require('./services/messagedetails.js.js');
var OwnerSignup = require('./services/ownersignup.js.js');
var RestaurantContact = require('./services/restaurantcontact.js.js');
var OwnerDetails = require('./services/ownerdetails.js.js');
var RestaurantDetails = require('./services/restaurantdetails.js.js');
var RestaurantMenu = require('./services/restaurantmenu.js.js');
var DeleteDish = require('./services/deletedish.js.js');
var DeleteSection = require('./services/deletesection.js.js');
var MenuDetails = require('./services/menudetails.js.js');
var UpdateRestaurantMenu = require('./services/updaterestaurantmenu.js.js');
var OrderStatus = require('./services/orderstatus.js.js');
var OwnerImage = require('./services/ownerimage.js.js');
var OwnerImageForm = require('./services/ownerimageform.js.js');
var MenuImage = require('./services/menuimage.js.js');
var MenuImageForm = require('./services/menuimageform.js.js');




function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
// handleTopicRequest("post_book",Books)
// handleTopicRequest("sign_in",Books)
handleTopicRequest("restaurants",Restaurants)
handleTopicRequest("sign_up",Signup)
handleTopicRequest("sections_menu",SectionsMenu)
handleTopicRequest("restaurant_sections",RestaurantSections)
handleTopicRequest("user_order",UserOrder)
handleTopicRequest("order_list",OrderList)
handleTopicRequest("past_order_list",PastOrderList)
handleTopicRequest("post_message",PostMessage)
handleTopicRequest("message_details",MessageDetails)
handleTopicRequest("owner_signup",OwnerSignup)
handleTopicRequest("restaurant_contact",RestaurantContact)
handleTopicRequest("owner_details",OwnerDetails)
handleTopicRequest("restaurant_details",RestaurantDetails)
handleTopicRequest("restaurant_menu",RestaurantMenu)
handleTopicRequest("delete_dish",DeleteDish)
handleTopicRequest("delete_section",DeleteSection)
handleTopicRequest("menu_details",MenuDetails)
handleTopicRequest("update_restaurant_menu",UpdateRestaurantMenu)
handleTopicRequest("order_status",OrderStatus)
handleTopicRequest("owner_image",OwnerImage)
handleTopicRequest("menu_image",MenuImage)
handleTopicRequest("owner_image_form",OwnerImageForm)
handleTopicRequest("menu_image_form",MenuImageForm)




