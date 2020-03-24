<<<<<<< HEAD
    console.log(eventItems);

    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    newDates = eventItems.map(a => a.date.toLocaleDateString(('en-US'), dateOptions));
    console.log(newDates);
    // console.log(newDates.toLocaleDateString('en-US'));
    

  // });
  // console.log(eventItems);
  res.render('index', {eventItems});
});
=======