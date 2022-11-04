from tkinter import *
import numpy as np
import matplotlib.pyplot as plt
import tkinter as tk
from tkinter import ttk
from tkinter import messagebox, filedialog
import os
import pandas as pd

import fbprophet as Prophet
import pymysql
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.application import MIMEApplication
from email.mime.text import MIMEText
import os


def try_login():               # this my login function  
    if name_entry.get()==default_name and password_entry.get() == default_password: 
       messagebox.showinfo("LOGIN SUCCESSFULLY","WELCOME")
    else:
       messagebox.showwarning("login failed","Please try again" )


def cancel_login():        # exit function
    log.destroy()


default_name=("user")      #DEFAULT LOGIN ENTRY
default_password=("py36")


log=Tk()                   #this login ui
log.title("ADMIN-LOGIN")
log.geometry("400x400+400+200")
log.resizable (width=FALSE,height=FALSE)


LABEL_1 = Label(log,text="USER NAME")
LABEL_1.place(x=50,y=100)
LABEL_2 = Label(log,text="PASSWORD")
LABEL_2.place(x=50,y=150)

BUTTON_1=ttk. Button(text="login",command=try_login)
BUTTON_1.place(x=50,y=200)
BUTTON_1=ttk. Button(text="cancel",command=cancel_login)
BUTTON_1.place(x=200,y=200)

name_entry=Entry(log,width=30)
name_entry.place(x=150,y=100)
password_entry=ttk. Entry(log,width=30,show="*")
password_entry.place(x=150,y=150)

log.mainloop()


####Email Services################################################################


MY_ADDRESS = "josephrvishal@gmail.com"
MY_PASSWORD = "xccbvoonibqawmfu"
SENDER_EMAIL = "manishgowdans@gmail.com"
HOST = "smtp.gmail.com"
PORT = 587
s = smtplib.SMTP("smtp.gmail.com", 587)
s.starttls()
s.login(
    MY_ADDRESS,
    MY_PASSWORD,
)


##########SQL CONNECTIONS #
mydb = pymysql.connect(
    host="localhost",
    user="root",
    password="manumani",
    database="hotel",
    charset="utf8mb4",
    port=3306,
)
cursor = mydb.cursor()

mydata = []

cookedValue = 0


def Yielder():

    yields = np.array(mydata)
    weights = yields[:, [1]]

    sum_total_weight = 0
    sum_total_value = 0
    totalvalue = yields[:, [3]]
    for i in range(weights.shape[0]):
        sum_total_weight += float(weights[i][0])
    for j in range(weights.shape[0]):
        sum_total_value += float(totalvalue[j][0])

    FinalYield = float(ProductWeight.get()) - sum_total_weight
    NetCost = float(ProductValue.get()) - sum_total_value
    Cost_per_pound = round(NetCost / FinalYield, 2)
    Percentage = (Cost_per_pound / 2) * 100

    Cooked_cost_per_kg = round(NetCost / float(ProductWeightServed.get()))
    cookedValue = round(Cooked_cost_per_kg * float(ProductWeight.get()))
    Shrinkage = FinalYield - float(ProductWeightServed.get())
    Shrinkage_percentage = (Shrinkage / float(ProductWeightServed.get())) * 100
    print(cookedValue)

    messagebox.showinfo(
        "Yield",
        ProductName.get()
        + "\n"
        + "The total weight of the product is: "
        + str(round(sum_total_weight, 2))
        + "\n"
        + " The total value of the product is: "
        + str(round(sum_total_value, 2))
        + "\n"
        + " The final yield of the product is: "
        + str(round(FinalYield))
        + "\n"
        + " The net cost of the product is: "
        + str(round(NetCost))
        + "\n"
        + " The wastage  cost per Kilo of the product  is: "
        + str(round(Cost_per_pound, 2))
        + "\n"
        + " The percentage of the product is: "
        + str(round(Percentage, 2))
        + "\n"
        + "The cooked cost per kg is:"
        + str(round(Cooked_cost_per_kg))
        + "\n"
        + "The Shrinkage is:"
        + str(round(Shrinkage))
        + "\n"
        + "The Shrinkage percentage is:"
        + str(round(Shrinkage_percentage))
        + "\n"
        + "The dish is "
        + ProductNameCooked.get(),
    )
    cursor.execute(
        "INSERT INTO `YeildResult`(`ItemName`, `InitalWeight`,`TotalCost`,`PricePerKilo`,`FinalWeight`,`TotalfCost`,`finalYeild`,`NetCost`,`CalculatedCostWastage`,`percentageUsed`) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)",
        (
            ProductName.get(),
            float(ProductWeight.get()),
            float(ProductValue.get()),
            float(ProductPricePerPound.get()),
            sum_total_weight,
            sum_total_value,
            FinalYield,
            NetCost,
            Cost_per_pound,
            Percentage,
        ),
    )
    mydb.commit()
    clear()


################################################################Sales Analyser
def Analyser():
    fln = filedialog.askopenfilename(
        initialdir=os.getcwd(),
        title="Select CSV File",
        filetypes=(("CSV File", "*.csv"), ("All Files", "*.*")),
    )


    msg = MIMEMultipart()
    with open(fln, "r") as f:
        reader = pd.read_csv(f)
        df = pd.DataFrame(reader)
        df = df.dropna()
        df["Date"] = pd.to_datetime(df["Date"], errors="coerce")
        df.drop("WeekDays", axis=1, inplace=True)
        df.columns = ["ds", "y"]
        m = Prophet.Prophet(interval_width=0.95)
        m.fit(df)
        future = m.make_future_dataframe(periods=365, freq="D")
        forecast = m.predict(future)
        forecast[["ds", "yhat", "yhat_lower", "yhat_upper"]].tail()
        forecast.to_csv("PredictOutput.csv")
        with open("PredictOutput.csv", "rb") as file:
            msg.attach(MIMEApplication(file.read(), Name="PredictOutput.csv"))

        fig1 = m.plot(forecast)
        fig2 = m.plot_components(forecast)
        plt.show()
        fig1.savefig("forecast.png")
        fig2.savefig("forecast2.png")

        msg["From"] = MY_ADDRESS
        msg["To"] = SENDER_EMAIL
        msg["Subject"] = "Sales Forecast"
        msg.attach(MIMEText("Sales Forecast"))
        with open("forecast.png", "rb") as fil:
            part = MIMEApplication(
                fil.read(),
                Name=os.path.basename("forecast.png"),
            )
            part["Content-Disposition"] = 'attachment; filename="%s"' % os.path.basename(
                "forecast.png"
            )
            msg.attach(part)
        with open("forecast2.png", "rb") as fil:
            part = MIMEApplication(
                fil.read(),
                Name=os.path.basename("forecast2.png"),
            )
            part["Content-Disposition"] = 'attachment; filename="%s"' % os.path.basename(
                "forecast2.png"
            )
            msg.attach(part)
        s.send_message(msg)
        del msg
        messagebox.showinfo("Sales Forecast", "Sales Forecast has been sent to your email")


def mailler():
    msg = MIMEMultipart()
    body_part = MIMEText(
        "From the given ingredients list for the meal"
        + ProductNameCooked.get()
        + "we find that the item should be priced at "
        + str(cookedValue)
        + "for max profits.Also Kindly Find the Ingredients,Weights and Cost per weight of the product given below ",
        "plain",
    )
    cursor.execute("SELECT * FROM `YeildResult`")
    if len(mydata) < 1:
        messagebox.showerror("Error", "No Data Found To Export")
    else:
        cursor.execute("SELECT * FROM `YeildResult`")
        rows = cursor.fetchall()
        with open("yeilder.csv", "w") as f:
            for row in rows:
                f.write(
                    str(row[0])
                    + ","
                    + str(row[1])
                    + ","
                    + str(row[2])
                    + ","
                    + str(row[3])
                    + ","
                    + str(row[4])
                    + ","
                    + str(row[5])
                    + ","
                    + str(row[6])
                    + ","
                    + str(row[7])
                    + ","
                    + str(row[8])
                    + ","
                    + str(row[9])
                    + ","
                    + "\n"
                )
    with open("yeilder.csv", "rb") as file:
        msg.attach(MIMEApplication(file.read(), Name="final_yeilder.csv"))

    msg.attach(body_part)
    msg["From"] = MY_ADDRESS
    msg["To"] = "manishgowdans2002@gmail.com"
    msg["Subject"] = "Yield Report"

    s.sendmail(msg["From"], msg["To"], msg.as_string())
    messagebox.showinfo("Success", "Email Sent  Successfully")
    del msg
    s.quit()


#########ScrollBar ################3


def update(rows):
    global mydata
    mydata = rows
    for i in rows:
        tree.insert("", "end", values=i)


root = Tk()
##Search Functions
q = StringVar()
t1 = StringVar()
t2 = StringVar()
t3 = StringVar()
t4 = StringVar()
PricePerPound = StringVar()
TotalPrice = StringVar()
ProductName = StringVar()
ProductPricePerPound = StringVar()
ProductValue = StringVar()
ProductWeight = StringVar()
###CSV FILES
def export():
    if len(mydata) < 1:
        messagebox.showerror("Error", "No Data Found To Export")
    else:
        cursor.execute("SELECT * FROM `raw_yeild`")
        rows = cursor.fetchall()
        with open("Dataset.csv", "w") as f:
            for row in rows:
                f.write(
                    str(row[0])
                    + ","
                    + str(row[1])
                    + ","
                    + str(row[2])
                    + ","
                    + str(row[3])
                    + ","
                    + str(row[4])
                    + ","
                    + "\n"
                )

        os.startfile("Dataset.csv")


###Import CSV FILES
def importcsv():
    fln = filedialog.askopenfilename(
        initialdir=os.getcwd(),
        title="Select CSV File",
        filetypes=(("CSV File", "*.csv"), ("All Files", "*.*")),
    )
    with open(fln, "r") as f:
        reader = pd.read_csv(f)
        for _, row in reader.iterrows():
            cursor.execute(
                "INSERT INTO `raw_yeild`(`Item`, `Weight`, `Value`, `TotalValue`) VALUES (%s,%s,%s,%s)",
                (
                    row["Item"],
                    float(row["Weight"]),
                    float(row["Value"]),
                    round(float(row["Value"]) * float(row["Weight"]), 3),
                ),
            )
        mydb.commit()


###Graph
def graph():
    cursor.execute("SELECT * FROM `raw_yeild`")
    rows = cursor.fetchall()
    x = []
    y = []

    for row in rows:
        x.append(row[0])
        y.append(row[3])
    plt.xlabel("Values")
    plt.ylabel("Weights")
    plt.bar(x, y)
    plt.show()


#####INsert
def insert():
    cursor.execute(
        "INSERT INTO `raw_yeild`(`Item`, `Weight`, `Value`, `TotalValue`) VALUES (%s,%s,%s,%s)",
        (
            t1.get(),
            t2.get(),
            t3.get(),
            round(float(t2.get()) * float(t3.get()), 2),
        ),
    )
    mydb.commit()
    messagebox.showinfo("Success", "Record Inserted Successfully")
    clear()


###Delete
def delete():
    row = getrow()
    cursor.execute(
        "DELETE FROM `raw_yeild` WHERE `Item`=%s",
        (row[0]),
    )
    mydb.commit()
    messagebox.showinfo("Success", "Record Deleted Successfully")
    clear()


#####inserting into database
def update1():
    row = getrow()
    cursor.execute(
        "UPDATE `raw_yeild` SET `Item`=%s,`Weight`=%s,`Value`=%s,`TotalValue`=%s WHERE `Item`=%s",
        (
            t1.get(),
            t2.get(),
            t3.get(),
            round(float(t2.get()) * float(t3.get()), 2),
            row[0],
        ),
    )
    mydb.commit()
    messagebox.showinfo("Success", "Record Updated Successfully")
    clear()


def search():
    q2 = q.get()
    tree.delete(*tree.get_children())
    cursor.execute(
        "SELECT Item,Weight,Value,TotalValue  FROM `raw_yeild` WHERE `Item` LIKE '%"
        + q2
        + "%' OR `Weight` LIKE '%"
        + q2
        + "%' "
    )
    rows = cursor.fetchall()
    update(rows)


###CLearing Search Functions
def clear():
    tree.delete(*tree.get_children())
    cursor.execute("SELECT Item,Weight,Value,TotalValue FROM `raw_yeild`")
    rows = cursor.fetchall()
    update(rows)


###Manipulation Data
def getrow():
    rowid = tree.selection()[0]
    row = tree.item(rowid, "values")
    return row


###Scroll bar
sb = Scrollbar(root)
sb.pack(side=RIGHT, fill=Y)
root.iconbitmap('C:/Users/Manish/Desktop/a.ico')

wrapper1 = LabelFrame(root, text="Trim Salvage Waste")

wrapper2 = LabelFrame(root, text="Search & Manipulate Data")
wrapper3 = LabelFrame(root, text="Raw  & Cook Yield Testing")
wrapper4 = LabelFrame(root, text="Sales  Analysis")
wrapper1.pack(fill="both", expand="no", padx=20, pady=10)
wrapper2.pack(fill="both", expand="no", padx=20, pady=10)
wrapper3.pack(fill="both", expand="no", padx=20, pady=10)
wrapper4.pack(fill="both", expand="no", padx=20, pady=10)

##Tree View
tree = ttk.Treeview(wrapper1, columns=(1, 2, 3, 4), show="headings", height="6")
tree.pack()
tree.heading(1, text="Item")
tree.heading(2, text="Quantity")
tree.heading(3, text="Value per Unit")
tree.heading(4, text="Total Value")
tree.bind("<Double 1>", getrow)
##Searching results
lbl = Label(wrapper2, text="Search")
lbl.grid(row=0, column=0, padx=5, pady=3)
ent = Entry(wrapper2, textvariable=q)
ent.grid(row=0, column=1, padx=5, pady=3)
btn = Button(wrapper2, text="Search", command=search)
btn.grid(row=0, column=2, padx=5, pady=3)
btn = Button(wrapper2, text="Clear", command=clear)
btn.grid(row=0, column=3, padx=5, pady=3)


##CSV FILES SECTION
expbtn = Button(wrapper1, text="Export CSV", command=export)
expbtn.pack(side=tk.LEFT, padx=5, pady=3)

impbtn = Button(wrapper1, text="Import CSV", command=importcsv)
impbtn.pack(side=tk.LEFT, padx=5, pady=3)


extbtn = Button(wrapper1, text="Exit", command=lambda: exit())
extbtn.pack(side=tk.LEFT, padx=5, pady=3)
##Raw Yeild Testing
LabeProduct = Label(wrapper3, text="Enter the Item to Calculate Yield Test")
LabeProduct.grid(row=0, column=0, padx=5, pady=3)
Name = Entry(wrapper3, textvariable=ProductName)
Name.grid(row=0, column=1, padx=5, pady=3)
LabelWeight = Label(wrapper3, text="Enter the Weight of the Item(in grams)")
LabelWeight.grid(row=1, column=0, padx=5, pady=3)
Weight = Entry(wrapper3, textvariable=ProductWeight)
Weight.grid(row=1, column=1, padx=5, pady=3)
LabelValue = Label(wrapper3, text="Enter the Total Cost of the Item")
LabelValue.grid(row=2, column=0, padx=5, pady=3)
Value = Entry(wrapper3, textvariable=ProductValue)
Value.grid(row=2, column=1, padx=5, pady=3)
LabelPricePerPound = Label(
    wrapper3, text="Enter the Price Per Kilo of the Item(in grams)"
)
LabelPricePerPound.grid(row=3, column=0, padx=5, pady=3)
PricePerPound = Entry(wrapper3, textvariable=ProductPricePerPound)
PricePerPound.grid(row=3, column=1, padx=5, pady=3)

Calbtn = Button(wrapper3, text="Calculate Yield", command=Yielder)
Calbtn.grid(row=7, column=0, padx=5, pady=3)
Grid = Button(wrapper3, text="Plot Graph", command=graph)
Grid.grid(row=7, column=1, padx=5, pady=3)
Sendbtn = Button(wrapper3, text="Send Mail", command=mailler)
Sendbtn.grid(row=7, column=2, padx=5, pady=3)

##Cook Yeild Testing
ProductNameCooked = StringVar()
ProductWeightServed = StringVar()
ProductSellingPrice = StringVar()
LabelProduct = Label(wrapper3, text="Enter the  Cooked Item to Calculate Yield Test")
LabelProduct.grid(row=4, column=0, padx=5, pady=3)
Name = Entry(wrapper3, textvariable=ProductNameCooked)
Name.grid(row=4, column=1, padx=5, pady=3)
LabelWeight = Label(wrapper3, text="Enter Serving  Weight of the Item(in grams)")
LabelWeight.grid(row=5, column=0, padx=5, pady=3)
Weight = Entry(wrapper3, textvariable=ProductWeightServed)
Weight.grid(row=5, column=1, padx=5, pady=3)
LabelValue = Label(wrapper3, text="Enter the Total Selling Price of Dish")
LabelValue.grid(row=6, column=0, padx=5, pady=3)
Value = Entry(wrapper3, textvariable=ProductSellingPrice)
Value.grid(row=6, column=1, padx=5, pady=3)


###SQL SECTION
query = "select Item,Weight,Value,TotalValue from raw_yeild"
cursor.execute(query)
rows = cursor.fetchall()


update(rows)


lbl1 = Label(wrapper2, text="Item")
lbl1.grid(row=1, column=0, padx=5, pady=3)
ent1 = Entry(wrapper2, textvariable=t1)
ent1.grid(row=1, column=1, padx=5, pady=3)

lbl2 = Label(wrapper2, text="Weight")
lbl2.grid(row=2, column=0, padx=5, pady=3)
ent2 = Entry(wrapper2, textvariable=t2)
ent2.grid(row=2, column=1, padx=5, pady=3)

lbl3 = Label(wrapper2, text="Value")
lbl3.grid(row=3, column=0, padx=5, pady=3)
ent3 = Entry(wrapper2, textvariable=t3)
ent3.grid(row=3, column=1, padx=5, pady=3)


btne = Button(wrapper2, text="Insert", command=insert)
btne.grid(row=4, column=0, padx=5, pady=3)
btnd = Button(wrapper2, text="Delete", command=delete)
btnd.grid(row=4, column=1, padx=5, pady=3)
btnu = Button(wrapper2, text="Update", command=update1)
btnu.grid(row=4, column=2, padx=5, pady=3)

Btndf = Button(wrapper3, text="Sales ForeCast", command=Analyser)
Btndf.grid(row=7, column=3, padx=5, pady=3)



##################################

root.title("Fright Desktop Application")

root.geometry("1000x1000")
root.mainloop()


