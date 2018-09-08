$(document).ready(function() {


   $("#clear-form").on("click", function() {
      window.location.reload(true);
   });

   // var storageLength = localStorage.length;

   if (localStorage.length > 0) {
      $("#number-students").html(localStorage.length);
   }

   $("#email-student").on("click", function() {

      var student = $('#student-dropdown option:selected').text();
      var studentEmail = $('#student-dropdown option:selected').val();

      // Get student first name
      var studentFirstName = student.split(",");

      var length = $('input[name=optradio1]:checked').val();
      var engaged = $('input[name=optradio2]:checked').val();
      var interesting = $('input[name=optradio3]:checked').val();
      var heuristic = $('input[name=optradio4]:checked').val();
      var comments = $("#comments").val();
      var newline = "%0D%0A";
      var outOfFive = " / 5";

      var totalGrade = parseInt(length) + parseInt(engaged) + parseInt(interesting) + parseInt(heuristic);

      // Message components
      var lengthDescription = "LENGTH" + newline + "Response meets/exceeds 200 words";
      var engagedDescription = "ENGAGING WITH THE READINGS" + newline + "Evidence that students read/viewed the material , w/ clear reference (quoting/paraphrasing) of assigned readings and viewings";
      var interestingDescription = "SAYING INTERESTING AND USEFUL THINGS" + newline + "Saying something interesting and useful by relating topics to personal experiences, connections to other courses, or prior knowledge of the topic";
      var heuristicDescription = "THINKING YOURSELF INTO SENSE" + newline + "Rather than “performing studenting,” the writer used the assignment as a tool to think himself or herself into sense";

      // Final Message
      var emailMessage = "Hi" + studentFirstName[1] + "," + newline + "Below, I've added the assessment for your weekly writing assignment. As always, if you have any questions, don't hesitate to email me or chat with me after class." + newline + newline + lengthDescription + newline + length + outOfFive + newline + newline + engagedDescription + newline + engaged + outOfFive + newline + newline + interestingDescription + newline + interesting + outOfFive + newline + newline + heuristicDescription + newline + heuristic + outOfFive + newline +
         newline + "Total Points: " + totalGrade + newline + newline + "COMMENTS" + newline + comments;

      var openEmail = "mailto:" + studentEmail + "?subject=Weekly Writing Assessment" + "&body=" + emailMessage;

      localStorage.setItem(student, totalGrade);

      $("#number-students").html(localStorage.length);

      window.location.href = openEmail;

   });

   $("#show-all-students").on("click", function() {

      var roster = "";
      var key = 0;
      var value = '';
      var concat = '';

      for (var i = 0; i < localStorage.length; i++) {
         key = localStorage.key(i);
         value = localStorage.getItem(key);
         concat += key + ": " + value + "<br>";
      }

      $("#student-grades-modal").modal("show");
      $("#student-grades-modal .modal-body").html(concat);

   });

   // Remove all students from localstorage
   $("#erase-local-storage").on("click", function() {
      localStorage.clear();
      $("#number-students").html("");
      alert("Session Roster Cleared!");
      $("#purge-reminder").fadeOut();

   });

   // Tooltips
   $('[data-toggle="tooltip"]').tooltip();


   // Calculate and write total on click of each radio button
   $("input[type=radio]").click(function() {
      var total = 0;
      $("input[type=radio]:checked").each(function() {
         total += parseFloat($(this).val());
      });
      $("#totalpoints").html(total);
   });


});
// document.ready closes
