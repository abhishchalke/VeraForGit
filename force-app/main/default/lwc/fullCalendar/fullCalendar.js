import { LightningElement, track } from 'lwc';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import FullCalendarJS from '@salesforce/resourceUrl/FullCalendarJS';
import { NavigationMixin } from 'lightning/navigation';
import campList from '@salesforce/apex/FullCalendarService.getCampaign';
export default class FullCalendarJs extends NavigationMixin(LightningElement) {

  fullCalendarJsInitialised = false;
  @track allEvents = [];
  @track selectedEvent = undefined;
  renderedCallback() {
    if (this.fullCalendarJsInitialised) {
      return;
    }
    this.fullCalendarJsInitialised = true;
    Promise.all([
      loadScript(this, FullCalendarJS + '/jquery.min.js'),
      loadScript(this, FullCalendarJS + '/moment.min.js'),
      loadScript(this, FullCalendarJS + '/fullcalendar.min.js'),
      loadStyle(this, FullCalendarJS + '/fullcalendar.min.css'),
    ])
    .then(() => {
      this.getAllEvents();
    })
    .catch(error => {
      console.error({
        message: 'Error occured on FullCalendarJS',
        error
      });
    })
  }
  initialiseFullCalendarJs() {
    const ele = this.template.querySelector('div.fullcalendarjs');
    $(ele).fullCalendar({
      header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,basicWeek,basicDay,listWeek'
      },
      themeSystem : 'standard',
      defaultDate: new Date(), 
      navLinks: true,
      editable: true,
      eventLimit: true,
      events: this.allEvents,
      dragScroll : true,
      droppable: true,
      weekNumbers : true,
      eventClick: this.eventClickHandler.bind(this),
      dayClick :function(date, jsEvent, view) {
        jsEvent.preventDefault();
        
      },
    });
  }
  progress = 0;
  getAllEvents(){
      campList()
      .then(result => {
        this.allEvents = result.map(item => {
          return {
            id : item.Id,
            editable : true,
            title : item.Name,
            start : item.StartDate,
            end : item.EndDate,
            description : item.Description,
            ExpectedRevenue : item.ExpectedRevenue,
            AmountWonOpportunities : item.AmountWonOpportunities,
            percentagewon:Math.round((item.AmountWonOpportunities/item.ExpectedRevenue)*100),
            backgroundColor: "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")",
            borderColor: "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")"
          };
        });
        this.initialiseFullCalendarJs();
      })
      .catch(error => {
        window.console.log(' Error Occured ', error)
      })
      .finally(()=>{
        //this.initialiseFullCalendarJs();
      })
  }
  eventClickHandler = (event, jsEvent, view) => {
    this.selectedEvent =  event;
    const customEvent = new CustomEvent('eventclick', {
      detail: { id: event.id }
    });
    this.dispatchEvent(customEvent);
    this.handleEventClick(event.id);
}

  closeModal(){
    this.selectedEvent = undefined;
    this.register = false;
  }
  @track register=false;
    navigateToRecordPage() {
      console.log('CampId'+this.campId);
      window.location.href='https://brightertomorrowfoundation-dev-ed.trailblaze.my.site.com/BrighterTomorrowFoundation/s/campaign/'+this.campId;
     /* this[NavigationMixin.Navigate]({
          type: 'standard__recordPage',
          attributes: {
              recordId: this.campIds,
              objectApiName: 'campaign', // Replace witx1h the API name of your object
              actionName: 'view',
          },
      });*/
    }
    handleEventClick(recordId) {
      console.log('ids'+recordId);
      this.campId = recordId;
      // Now you can use the recordId as needed, for example, navigate to the record page
    }
  
a
}