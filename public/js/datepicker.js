// jshint esversion:9

const date = $("#datepicker").datepicker({ dateFormat: 'MM,yy' }).val();
const currentDate = $( "#datepicker" ).datepicker( "getDate" );

$( function() {
  $( "#datepicker" ).datepicker({
    changeMonth: true,
    changeYear: true,
    dateFormat: "MM/yy",
    showAnim: "slideDown",
    yearRange: "1950:2300",
    showButtonPanel: true,
    onClose: function(dateText, inst) {
              $(this).datepicker('setDate', new Date(inst.selectedYear, inst.selectedMonth, 1));
              $("#datepicker").value = $("#datepicker").datepicker({ dateFormat: 'MM,yy' }).val();
    }
  });
});
