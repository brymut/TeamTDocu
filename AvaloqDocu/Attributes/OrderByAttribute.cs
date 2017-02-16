using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AvaloqDocu.Attributes
{
    public class OrderByAttribute : Attribute
    {
        public OrderByAttribute(int orderId)
        {
            OrderId = orderId;
        }

        public int OrderId { get; set; }

    }
}
