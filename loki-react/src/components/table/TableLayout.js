export const mainHeader = (userInfo) => {
  return {
    table: {
      widths: ['auto', '*'],

      body: [
        [
          {
            text: 'LOKI',
            style: 'mainheader',
            bold: true,
            marginTop: 10,
          },

          {
            width: '*',
            style: 'info',
            marginBottom: 30,
            stack: [
              {
                style: 'h2',
                text: `Name: ${userInfo.name}`,
              },
              {
                style: 'h2',
                text: `Email: ${userInfo.email}`,
              },
            ],
          },
        ],
      ],
    },
    layout: {
      hLineWidth: function (line) {
        return line === 1;
      },
      vLineWidth: function () {
        return 0;
      },
      paddingBottom: function () {
        return 5;
      },
    },
  };
};

export const bodyForOrders = (orders) => {
  return {
    headerRows: 1,
    body: [
      [
        {
          text: 'S.No',
          bold: true,
          fillColor: '#DAA502',
          color: 'white',
        },
        {
          text: 'ID',
          bold: true,
          fillColor: '#DAA502',
          color: 'white',
        },
        {
          text: 'USER',
          bold: true,
          fillColor: '#DAA502',
          color: 'white',
        },
        {
          text: 'DATE',
          bold: true,
          fillColor: '#DAA502',
          color: 'white',
        },
        {
          text: 'TOTAL PRICE',
          bold: true,
          fillColor: '#DAA502',
          color: 'white',
        },
        {
          text: 'ORDER STATUS',
          bold: true,
          fillColor: '#DAA502',
          color: 'white',
        },
        {
          text: 'PAYMENT STATUS',
          bold: true,
          fillColor: '#DAA502',
          color: 'white',
        },
      ],

      ...orders.map((o, i) => [
        i + 1,
        o._id,
        o.userId && o.userId.name,
        o.createdAt.substring(0, 10),
        o.totalPrice,
        o.orderStatus,
        o.paymentStatus,
        // o.isPaid ? o.paidAt.substring(0, 10) : 'Not paid',
        // o.isDelivered ? o.deliveredAt.substring(0, 10) : 'Not paid',
      ]),
    ],
  };
};

export const bodyForUsers = (users) => {
  return {
    headerRows: 1,
    body: [
      [
        {
          text: 'S.No',
          bold: true,
          fillColor: '#DAA502',
          color: 'white',
        },
        {
          text: 'ID',
          bold: true,
          fillColor: '#DAA502',
          color: 'white',
        },
        {
          text: 'NAME',
          bold: true,
          fillColor: '#DAA502',
          color: 'white',
        },
        {
          text: 'EMAIL',
          bold: true,
          fillColor: '#DAA502',
          color: 'white',
        },
        {
          text: 'VERIFIED',
          bold: true,
          fillColor: '#DAA502',
          color: 'white',
        },
        {
          text: 'ROLE',
          bold: true,
          fillColor: '#DAA502',
          color: 'white',
        },
        {
          text: 'DATE',
          bold: true,
          fillColor: '#DAA502',
          color: 'white',
        },
      ],

      ...users.map((u, i) => [
        i + 1,
        u._id,
        u.name,
        u.email,
        u.verify ? 'Verified' : 'Not Verified',
        u.role,
        u.createdAt.substring(0, 10),
      ]),
    ],
  };
};

export const bodyForAlterations = (alterations) => {
  return {
    headerRows: 2,
    body: [
      [
        {
          text: 'NAME',
          bold: true,
          fillColor: '#DAA502',
          color: 'white',
        },
        {
          text: 'BAHU',
          bold: true,
          fillColor: '#DAA502',
          color: 'white',
        },
        {
          text: 'CAWAT',
          bold: true,
          fillColor: '#DAA502',
          color: 'white',
        },
        {
          text: 'DADA',
          bold: true,
          fillColor: '#DAA502',
          color: 'white',
        },
        {
          text: 'KAKI',
          bold: true,
          fillColor: '#DAA502',
          color: 'white',
        },
        {
          text: 'LABUH TANGAN',
          bold: true,
          fillColor: '#DAA502',
          color: 'white',
        },
        {
          text: 'LEHER',
          bold: true,
          fillColor: '#DAA502',
          color: 'white',
        },
        {
          text: 'LENGAN',
          bold: true,
          fillColor: '#DAA502',
          color: 'white',
        },
        {
          text: 'PEHA',
          bold: true,
          fillColor: '#DAA502',
          color: 'white',
        },
        {
          text: 'PINGGANG',
          bold: true,
          fillColor: '#DAA502',
          color: 'white',
        },
        {
          text: 'LILIT LENGAN',
          bold: true,
          fillColor: '#DAA502',
          color: 'white',
        },
        {
          text: 'STATUS',
          bold: true,
          fillColor: '#DAA502',
          color: 'white',
        }
      ],

      ...alterations.map((u, i) => [
        u.userId.name,
        u.bahu,
        u.cawat,
        u.dada,
        u.kaki,
        u.labuhTangan,
        u.leher,
        u.lengan,
        u.peha,
        u.pinggang,
        u.lilitLengan,
        u.status
      ]),
    ],
  };
};

export const bodyForAppointments = (appointments) => {
  return {
    headerRows: 1,
    body: [
      [
        {
          text: 'No',
          bold: true,
          fillColor: '#DAA502',
          color: 'white',
        },
        {
          text: 'ID',
          bold: true,
          fillColor: '#DAA502',
          color: 'white',
        },
        {
          text: 'NAME',
          bold: true,
          fillColor: '#DAA502',
          color: 'white',
        },
        {
          text: 'EMAIL',
          bold: true,
          fillColor: '#DAA502',
          color: 'white',
        },
        {
          text: 'PHONE',
          bold: true,
          fillColor: '#DAA502',
          color: 'white',
        },
        {
          text: 'APPOINTMENT DATE',
          bold: true,
          fillColor: '#DAA502',
          color: 'white',
        },
        {
          text: 'DESCRIPTION',
          bold: true,
          fillColor: '#DAA502',
          color: 'white',
        },
        {
          text: 'STATUS',
          bold: true,
          fillColor: '#DAA502',
          color: 'white',
        }
      ],

      ...appointments.map((u, i) => [
        i + 1,
        u._id,
        u.name,
        u.email,
        u.phone,
        u.appointmentDate,
        u.description,
        u.status
      ]),
    ],
  };
};

export const tableStyles = () => {
  return {
    header: {
      fontSize: 12,
      marginBottom: 20,
      marginTop: 20,
      bold: true,
    },
    mainheader: {
      fontSize: 15,
    },

    info: {
      marginLeft: 315,
    },

    h2: {
      marginTop: 5,
      fontSize: 7,
    },
  };
};
