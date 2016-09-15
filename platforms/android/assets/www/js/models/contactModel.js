window.Contact = Backbone.Model.extend({
});

window.Contacts = Backbone.Collection.extend({
  model: Contact,
  url: 'contact',
  collection: [
    {
      "id": 1,
      "hospital_id": 1,
      "name": "Westwood",
      "dept_info": "<p><strong><u>Address</u></strong></br>Edie & Lew Wasserman Building</br>300 Stein Plaza, Suite 420</br>Los Angeles, CA 90095</p><p><strong><u>Contact Info</u></strong></br>Phone: 310-825-5111</br>Fax: 310-825-7245</p><p><strong><u>Parking</u></strong></br>Enter from Westwood Plaza, north of Le Conte Avenue</br>&nbsp;&nbsp;&nbsp;&nbsp;$12 for single daily entry</p>",
      "hospital_info": {
        "transportation": {"img": {"url": "img/maps/ww-hospital.png", "width": 576, "height": 525}, "content": "<p><strong><u>Address</u></strong></br>Ronald Reagan UCLA Medical Center</br>757 Westwood Plaza</br>Los Angeles, CA 90095</p><p><strong><u>Contact info</u></strong></br>Hospital Information: 310-825-9111</br>Patient Information: 310-825-8611</br>Emergency Information: 310-825-2111</br>Information Desk: 310-267-9119</br></p>"},
        "floors": [
          {"id": 0, "name": "Level 1", "img": {"url": "img/maps/ww-floor-1.png", "width": 900, "height": 600}, "content": "", "table_of_contents": []},
          {"id": 1, "name": "Levels 4-8", "img": {"url": "img/maps/ww-floor-4-8.png", "width": 400, "height": 400}, "content": "", "table_of_contents": []},
          {"id": 2, "name": "Level B", "img": {"url": "img/maps/ww-floor-b.png", "width": 400, "height": 400}, "content": "", "table_of_contents": []},
          {"id": 3, "name": "Directory", "img": {"url": "", "width": 0, "height": 0}, "content": "", "table_of_contents": [
              {"name": "Admissions", "floor": "1", "room": "1314"},
              {"name": "Adult Non-Invasive Cardiology", "floor": "7", "room": "7215"},
              {"name": "ATM", "floor": "1", "room": " -- "},
              {"name": "Auditorium/Conference Center", "floor": "B", "room": "B130"},
              {"name": "Cafe", "floor": "B", "room": "B145"},
              {"name": "Cashiering", "floor": "1", "room": "1119"},
              {"name": "CASIT", "floor": "B", "room": "B792"},
              {"name": "Dialysis", "floor": "8", "room": "8237"},
              {"name": "Dining Commons", "floor": "1", "room": "1225"},
              {"name": "ECT", "floor": "4", "room": "1225"},
              {"name": "Emergency Department", "floor": "1", "room": "1517"},
              {"name": "Fetal Diagnostics/Triage Unit", "floor": "5", "room": "5511"},
              {"name": "Gift Shop", "floor": "1", "room": "1115"},
              {"name": "Gonda Observation Unit (GOU)", "floor": "1", "room": "1225"},
              {"name": "ICU", "floor": "4, 5, 6, 7, 8", "room": " -- "},
              {"name": "Maddie's Room (Surgical Waiting Room)", "floor": "1", "room": "1312"},
              {"name": "Mattel Children's Hospital", "floor": "3, 5", "room": " -- "},
              {"name": "Meditation Room", "floor": "1", "room": "1109"},
              {"name": "MRI/PET Suite", "floor": "1", "room": "1501"},
              {"name": "Neurophysiology", "floor": "6", "room": "6237"},
              {"name": "Office of Patient Experience", "floor": "1", "room": "1107"},
              {"name": "Parking", "floor": "P", "room": " -- "},
              {"name": "Patient Rooms", "floor": "3, 4, 5, 6, 7, 8", "room": " -- "},
              {"name": "Pediatric Neurodiag/Echo Lab", "floor": "5", "room": "5235"},
              {"name": "Pharmacy - Outpatient", "floor": "B", "room": "B140"},
              {"name": "Post Anesthesia Care Unit (PACU)", "floor": "2", "room": " -- "},
              {"name": "Pre/Post Treatment (PTU)", "floor": "2", "room": "2321"},
              {"name": "Radiology", "floor": "1", "room": "1501"},
              {"name": "Rehab Services", "floor": "3", "room": "3127"},
              {"name": "Resnick Neuropsychiatic Hospital", "floor": "4", "room": " -- "},
              {"name": "Security", "floor": "B", "room": "B641"},
              {"name": "Valet Lobby", "floor": "P", "room": " -- "},
              {"name": "Vending", "floor": "B", "room": "B700"},
              {"name": "Volunteer Services", "floor": "B", "room": "B791"}
            ]
          }
        ],
        "directions": "<strong><u>Driving Directions</u></strong><p><strong>From the San Diego Freeway (405):</strong></br>From the north, exit Wilshire East; or from the south, exit Wilshire Westwood. Turn left on Westwood Blvd. and go straight past Le Conte Avenue (the street becomes Westwood Plaza). The hospital is on the left, past UCLA Medical Plaza.</p><p><strong>From Los Angeles International Airport (LAX):</strong></br>Take the San Diego Freeway northbound to Wilshire Boulevard east, and continue as described above.</p><p><strong>From the East via the 10 (Santa Monica Freeway):</strong></br>Take 10 (Santa Monica Fwy) East to 405 (San Diego Fwy) North, and exit on Wilshire Boulevard east. Continue as described above.</p><p><strong><u>Parking</u></strong></br><p>Patients and visitors to Ronald Reagan UCLA Medical Center, Resnick Neuropsychiatric Hospital at UCLA and Mattel Children's Hospital UCLA have valet parking services available on Westwood Plaza. When leaving, you will retrieve your vehicle from the Valet Lobby located on Level P. Patient drop-off is available at Valet at the hospital entrance and at the Emergency entrance.</p><p><strong>Short-Term Parking</strong></br><ul><li>Daily Single Entry: Parking fee is a flat rate of $12.</li><li>Daily single entry with disabled person's placard/license plate is $5.</li><li>Pay on exit at level P: pay station, discharge lobby pay station or parking cashier. (Rates subject to change without notice.)</li></ul></p><p><strong>Long-Term Parking</strong></br><ul><li>24-HOUR parking fee is $22 with in and out privileges. With disabled person's parking placard is $10 with in/out privileges. Show disabled person's placard to valet attendant.</li></ul></p><p><strong>Extended Parking</strong></br><ul><li>Should you or your visitors require parking over an extended period of time, you may want to consider purchasing a consecutive-day discounted parking permit.</li></ul></p></p>"
      }
    },
    {
      "id": 2,
      "hospital_id": 2,
      "name": "Santa Monica",
      "dept_info": "<p><strong><u>Address</u></strong></br>UCLA Spine Center</br>1131 Wilshire Blvd, Suite 100</br>Santa Monica, CA 90401</p><p><strong><u>Contact Info</u></strong></br>Phone: 310-319-3475</br>Fax: 310-319-2231</p><p><strong><u>Parking</u></strong></br>Parking rates for the new office suite are as follows:</br>&nbsp;&nbsp;&nbsp;&nbsp;15 minutes or less - $2.00</br>&nbsp;&nbsp;&nbsp;&nbsp;16-30 minutes - $4.00</br>&nbsp;&nbsp;&nbsp;&nbsp;31 minutes to 45 minutes - $6.00</br>&nbsp;&nbsp;&nbsp;&nbsp;46 minutes and up pays daily maximum rate of $7.75</p>",
      "hospital_info": {
        "transportation": {"img": {"url": "img/maps/sm-hospital.png", "width": 900, "height": 600}, "content": "<p><strong><u>Address</u></strong></br>UCLA Medical Center, Santa Monica</br>1250 16th Street</br>Santa Monica, CA 90404</p><p><strong><u>Contact Info</u></strong></br>Hospital Information: 424-259-6000</br>Emergency Center: 424-259-8400</p>"},
        "floors": [
          {"id": 0, "name": "Floor A", "img": {"url": "img/maps/sm-floor-a.png", "width": 900, "height": 600}, "content": "", "table_of_contents": []},
          {"id": 1, "name": "Floor 1", "img": {"url": "img/maps/sm-floor-1.png", "width": 900, "height": 600}, "content": "", "table_of_contents": []},
          {"id": 2, "name": "Floor 2", "img": {"url": "img/maps/sm-floor-2.png", "width": 900, "height": 600}, "content": "", "table_of_contents": []},
          {"id": 3, "name": "Floor 3", "img": {"url": "img/maps/sm-floor-3.png", "width": 900, "height": 600}, "content": "", "table_of_contents": []},
          {"id": 4, "name": "Floor 4", "img": {"url": "img/maps/sm-floor-4.png", "width": 900, "height": 600}, "content": "", "table_of_contents": []},
          {"id": 5, "name": "Floor 5", "img": {"url": "img/maps/sm-floor-5.png", "width": 900, "height": 600}, "content": "", "table_of_contents": []},
          {"id": 6, "name": "Floor 6", "img": {"url": "img/maps/sm-floor-6.png", "width": 900, "height": 600}, "content": "", "table_of_contents": []},
          {"id": 7, "name": "Directory", "img": {"url": "", "width": 0, "height": 0}, "content": "", "table_of_contents": [
              {"name": "Admissions", "floor": "G", "room": ""},
              {"name": "Cafeteria", "floor": "G", "room": ""},
              {"name": "Cashier", "floor": "A", "room": ""},
              {"name": "Chapel/Meditation Room", "floor": "A", "room": ""},
              {"name": "Emergency Room (ER)", "floor": "A", "room": ""},
              {"name": "Geriatric Unit", "floor": "5", "room": ""},
              {"name": "Gift Shop", "floor": "G", "room": ""},
              {"name": "ICU", "floor": "4", "room": ""},
              {"name": "Intermeditate Care Unit", "floor": "5", "room": ""},
              {"name": "Labor & Delivery", "floor": "2", "room": ""},
              {"name": "Labor & Delivery/NICU Waiting", "floor": "2", "room": ""},
              {"name": "Luskin Children's Clinic (Suite 2100)", "floor": "2", "room": ""},
              {"name": "Medical Procedures Unit", "floor": "1", "room": ""},
              {"name": "Medicine/Surgery Units", "floor": "4", "room": ""},
              {"name": "MRI", "floor": "2", "room": ""},
              {"name": "NICU", "floor": "2", "room": ""},
              {"name": "Nursery", "floor": "2", "room": ""},
              {"name": "Oncology", "floor": "4", "room": ""},
              {"name": "Orthopaedic Outpatient Services (Suite 2100)", "floor": "2", "room": ""},
              {"name": "Orthopaedic Unit", "floor": "3", "room": ""},
              {"name": "Outpatient Services Reception (Suite 1401)", "floor": "1", "room": ""},
              {"name": "Patient Rooms 2412 - 2536", "floor": "2", "room": ""},
              {"name": "Patient Rooms 3204 - 3266", "floor": "3", "room": ""},
              {"name": "Patient Rooms 4204 - 4556", "floor": "4", "room": ""},
              {"name": "Patient Rooms 5204 - 5498", "floor": "5", "room": ""},
              {"name": "Patient Rooms 6204 - 6266", "floor": "6", "room": ""},
              {"name": "Pediatric Unit", "floor": "6", "room": ""},
              {"name": "Perinatal Center", "floor": "1", "room": ""},
              {"name": "Perinatal Services", "floor": "1", "room": ""},
              {"name": "PICU", "floor": "4", "room": ""},
              {"name": "Postpartum Unit", "floor": "2", "room": ""},
              {"name": "Pulmonary Function Lab", "floor": "4", "room": ""},
              {"name": "Radiology, Imaging Services (CT Scan, Fluoroscopy, MRI, Ultrasound, X-Ray)", "floor": "2", "room": ""},
              {"name": "Security", "floor": "G", "room": ""},
              {"name": "Surgical & Interventional Services", "floor": "3", "room": ""},
              {"name": "Surgical Services", "floor": "3", "room": ""},
              {"name": "Surgical Waiting Area (Suite 3500)", "floor": "3", "room": ""},
              {"name": "Teen Center", "floor": "6", "room": ""}
            ]
          }
        ],
        "directions": "<strong><u>Driving Directions</u></strong><p><strong>From the 10 Freeway West:</strong></br>Exit at Cloverfield Boulevard (north) to Santa Monica Boulevard. Turn left (west) on Santa Monica Boulevard. Turn right (north) on 16th Street to 1250 16th Street. Valet parking is available at our main entrance, and parking garages are located on 15th and 16th Streets.</p><p><strong>From the 405 Freeway (San Diego Freeway):</strong></br>Connect with the 10 Freeway West and follow the directions above or exit Wilshire Boulevard West (from the San Fernando Valley), merge onto Wilshire Boulevard. Turn left (south) on 16th Street to 1250 16th Street. Valet parking is available at our main entrance, and parking garages are located on 15th and 16th Streets.</p><p><strong><u>Parking</u></strong><p>Parking is in short supply throughout Santa Monica, including the area near UCLA Medical Center, Santa Monica. There are, however, several parking options available to patients and visitors. These options include:<ul><li> Valet Service -- 1250 16th Street; Weekdays on a 24-hour basis. Daily valet parking is $12.00.</li><li>1260 15th St. Medical Building -- Weekdays: 6:30 am to 10 pm; Saturdays: 8 am to 6 pm. Rates posted at entrance.</li><li>1245 16th St. Medical Building -- Weekdays: 6 am to 10 pm; Saturdays: 8 am to 5 pm. Rates posted at entrance.</li><li>1311 16th St. Structure -- Weekdays: 6:30 pm to 6 am; Weekends, Holidays: All day. Access tokens available for $5 at our main Security desk at 1250 16th St.</li><li>Metered street parking -- Please carefully read street signs. Meters in effect every day except Sunday.</li></ul></p></p>"
      }
    }
  ],
  getContactByHospital: function (h_id) {
    var contacts,
            i;

    contacts = this.collection;
    for (i = 0; i < contacts.length; i++) {
      if (contacts[i].hospital_id === parseInt(h_id)) {
        return contacts[i];
      }
    }
    return {};
  }

});