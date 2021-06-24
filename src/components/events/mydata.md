<>
<div className="subsection__header__container">
<h2 className="subsection__header">Past Events</h2>
</div>
<div className="Events">
{/_ {events.forEach((event) => {
if (Date.parse(event.date) < Date.now()) {
filteredEvents.push(event);
}
return { filteredEvents };
})} _/}

        {filteredEvents.map((event) => {
          // const humanReadableStartTime =
          //   event.startTime.toLocaleTimeString();
          // console.log(filteredEvents);


return (

<div
className="event"
id={`event--${event.id}`}
key={`event--${event.id}`} >
<div className="event__title option__name">
<h3>{event.title}</h3>
</div>
<div className="event__info">
<h4 className="event__location">
{event.location}
</h4>
<div className="event__date event__startTime">
{event.date} at {event.startTime}
</div>
<div className="event__comments">
{event.comments}
</div>
<div className="event__participants">
<div>
Participants here{" "}
{/_ {users.map(
(user) => user.name.join(", ")
// user.id === events.userEvents.userId
)} _/}
{/_ {participants}
{"------------"} _/}
{users.map(user =>  
 }
{/_ {userEvents
.map((participant) => {
if (participant.eventId === event.id) {
return participant.userId;
}
})
.join(" , ")} _/}
{/_ {filteredEvents.userEvents
.map((participant) => {
if (
participant.eventId ===
filteredEvents.event.id
) {
return participant.userId;
}
})
.join(" , ")} _/}
</div>
</div>
<div className="event__participants__time">
<div>!!! Finish times go here !!!</div>
</div>
{/_ PANIC ATTACKS _/}
<div className="button_group">
<button
className="btn"
onClick={() => {
history.push(`/past/edit/${event.id}`);
}} >
Edit Event
</button>
</div>
{/_ OLD BUTTON GOES HERE _/}
</div>
</div>
);
})}
</div>
</>
);
