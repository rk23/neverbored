<% if(typeof alerts !== undefined) {%>
<% for (key in alerts) {%>
    <% alerts[key].forEach(function(thisMsg) {%>
            <div class="alert alert-<%=key%> alert-dismissible fade in">
                <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <%= thisMsg %></div>
                <% }); %>
    <% } %>
<% }%>