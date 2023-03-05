"""
A Pure Javascript HTML UI Focus Manager - Copyright (C) 2023 Fabio F.G. Buono
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License 
as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of 
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see https://www.gnu.org/licenses/
"""

      class FocusOrder {
        constructor() {
          this.updateElements();
          this.setTabIndex();
          document.body.addEventListener("DOMNodeInserted", this.updateElements);
          document.body.addEventListener("DOMNodeRemoved", this.updateElements);
        }
  
        updateElements = () => {
          this.elements = Array.from(document.querySelectorAll("[id^='Tab']"));
  
          if (!this.elements.length) {
            console.error("No elements found with an ID starting with 'Tab'");
            return;
          }
  
          this.order = this.elements.sort((a, b) => {
            let aIndex = parseInt(a.id.replace("Tab", ""));
            if (isNaN(aIndex)) {
              console.error(`Cannot parse '${a.id}' to a number`);
              return 0;
            }
  
            let bIndex = parseInt(b.id.replace("Tab", ""));
            if (isNaN(bIndex)) {
              console.error(`Cannot parse '${b.id}' to a number`);
              return 0;
            }
  
            return aIndex - bIndex;
          });
        };
  
        setTabIndex = () => {
          this.elements.forEach((element, i) => {
            if (!element.hasOwnProperty("tabIndex")) {
              console.error(`Element with ID '${element.id}' does not have a 'tabIndex' property`);
              return;
            }
            element.tabIndex = i;
          });
        };
      }
  
      window.onload = function() {
        new FocusOrder();
      };
