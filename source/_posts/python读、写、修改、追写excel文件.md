---
title: python读、写、修改、追写excel文件
date: 2024-07-21 11:46:11
tags: [Excel, Python]
categories: foreigners
---

### 四个工具包

　　python 操作 excel 的 4 个工具包如下

-   **xlrd**: 对 .xls 进行读相关操作
-   **xlwt**: 对 .xls 进行写相关操作
-   **xlutils**: 对 .xls 读写操作的整合
-   **openpyxl**：对 .xlsx 进行读写操作

注意，前三个库都只能操作 .xls，不能操作 .xlsx。最后一个只能操作 .xlsx，不能操作 .xls

```python
pip install xlrd
pip install xlwt
pip install xlutils
pip install openpyxl
```

### xlwt 写 .xls 文件

**基本用法**



```python
import xlwt

wbk = xlwt.Workbook(encoding="utf-8") # 创建 xls 文件,可被复写
datasheet = wbk.add_sheet("sheet1") # 创建一个名为sheet1的sheet

# 设置单元格的样式，如字体、背景颜色等等
style = xlwt.easyxf('pattern: pattern solid, fore_colour red')

# 语法：write(n, m, "aaa", [style])===>第n行，第m列，内容, [样式](样式可以不指定，不指定即为默认样式)
datasheet.write(0, 0, "十年之前", style)
datasheet.write(0, 1, "我不认识你")
datasheet.write(1, 2, "你不属于我")
datasheet.write(2, 3, "我们还是一样")

# 合并单元格
worksheet.write_merge(3, 4, 0, 3, '赔在一个陌生人左右') 
# 四个参数a,b,c,d：合并第 a 行到第 b 行，第 c 列到第 d 列

wbk.save("ttt.xls") # 保存
```



**设置样式**



```
wk = xlwt.Workbook()    # 新建一个 Excel
sheet = wk.add_sheet('sheet1')    # 新建一个名为 sheer1 的工作簿

# 创建一个样式对象，初始化样式
style = xlwt.XFStyle()  
al = xlwt.Alignment()
al.horz = 0x02      # 设置水平居中0x02，左端对齐0x01，右端对齐0x03
al.vert = 0x01      # 设置垂直居中 0x01，上端对齐0x00，底端对齐0x02
style.alignment = al

sheet.write(0, 0, '文本居中', style)
wk.save('Test.xls')
```

设置文本对齐样式（方式一）



```
import xlwt
workbook = xlwt.Workbook()
worksheet = workbook.add_sheet('sheet1')

# 文本对齐的对象
alignment = xlwt.Alignment()
# 水平方向的对齐样式
alignment.horz = xlwt.Alignment.HORZ_CENTER # May be: HORZ_GENERAL, HORZ_LEFT, HORZ_CENTER, HORZ_RIGHT, HORZ_FILLED, HORZ_JUSTIFIED, HORZ_CENTER_ACROSS_SEL, HORZ_DISTRIBUTED
# 垂直方向的对齐样式
alignment.vert = xlwt.Alignment.VERT_CENTER # May be: VERT_TOP, VERT_CENTER, VERT_BOTTOM, VERT_JUSTIFIED, VERT_DISTRIBUTED

# 初始化一个样式对象，将对齐的对象作为他的一个属性
style = xlwt.XFStyle() # Create Style
style.alignment = alignment # Add Alignment to Style
worksheet.write(0, 0, '冷咖啡离开了杯垫，我忍住的情绪在很后面', style)
workbook.save('Excel_Workbook.xls')
```

设置文本对齐样式（方式二）



```
import xlwt

workbook = xlwt.Workbook()
worksheet = workbook.add_sheet('sheet1')

style = xlwt.XFStyle() # 初始化样式
font = xlwt.Font() # 为样式创建字体
font.name = 'Times New Roman' # 字体名
font.bold = True # 加粗
font.underline = True # 下划线
font.italic = True # 斜体字
style.font = font # 设定样式

worksheet.write(0, 0, 'Unformatted value') # 不带样式的写入
worksheet.write(1, 0, 'Formatted value', style) # 带样式的写入，多了一个 style 参数

workbook.save('ttt.xls') # 保存文件
```

设置文本的字体



```
import xlwt

workbook = xlwt.Workbook()
worksheet = workbook.add_sheet('sheet1')
worksheet.write(0, 0,'你要的全拿走，把回忆化成空。留下我们的狗，不管有没有用，我怕他以后没人宠。')

# 设置单元格宽度
worksheet.col(0).width = 3333
workbook.save('cell_width.xls')
```

设置单元格宽度



```
import xlwt
workbook = xlwt.Workbook()
worksheet = workbook.add_sheet('sheet1')

worksheet.write(0, 0, xlwt.Formula('HYPERLINK("http://www.google.com";"Google")')) # 前面是链接，后面是文本
workbook.save('Excel_Workbook.xls')
```

添加超链接



```
import xlwt
workbook = xlwt.Workbook()
worksheet = workbook.add_sheet('sheet1')

# 边框对象
borders = xlwt.Borders() 
# 设置边框样式，常用：DASHED虚线，THIN实线，NO_LINE没有线
borders.left = xlwt.Borders.DASHED 
borders.right = xlwt.Borders.DASHED
borders.top = xlwt.Borders.DASHED
borders.bottom = xlwt.Borders.DASHED

# 所有边框样式: NO_LINE, THIN, MEDIUM, DASHED, DOTTED, THICK, DOUBLE, HAIR, MEDIUM_DASHED, THIN_DASH_DOTTED, MEDIUM_DASH_DOTTED, THIN_DASH_DOT_DOTTED, MEDIUM_DASH_DOT_DOTTED, SLANTED_MEDIUM_DASH_DOTTED, or 0x00 through 0x0D.

# 边框颜色
borders.left_colour = 0x40
borders.right_colour = 0x40
borders.top_colour = 0x40
borders.bottom_colour = 0x40

# 初始化一个样式对象，将边框对象作为他的一个属性
style = xlwt.XFStyle() # Create Style
style.borders = borders # Add Borders to Style

worksheet.write(0, 0, '幽默是世界上最好的礼物', style)
workbook.save('ttt.xls')
```

添加边框



```python
import xlwt
workbook = xlwt.Workbook()
worksheet = workbook.add_sheet('sheet1')

# Pattern对象用于声明颜色
pattern = xlwt.Pattern()
pattern.pattern = xlwt.Pattern.SOLID_PATTERN # May be: NO_PATTERN, SOLID_PATTERN, or 0x00 through 0x12
pattern.pattern_fore_colour = 5 # 背景色（5是黄色）

# 创建样式对象，颜色对象为他的属性
style = xlwt.XFStyle() # Create the Pattern
style.pattern = pattern # Add Pattern to Style

worksheet.write(0, 0, '我头戴圆顶礼帽鞋子特大号', style)
workbook.save('ttt.xls')

'''
其他常用背景色
0 = Black
1 = White
2 = Red,
3 = Green
4 = Blue
5 = Yellow
6 = Magenta
7 = Cyan
16 = Maroon
17 = Dark Green
18 = Dark Blue
19 = Dark Yellow , almost brown)
20 = Dark Magenta
21 = Teal
22 = Light Gray
23 = Dark Gray
......
'''
```

设置背景色颜色

### **xlrd 读 .xls 文件**

**基本用法**


```
import xlrd

data = xlrd.open_workbook('excelFile.xls') # 打开Excel文件读取数据

# 获取sheet
the_sheet = data.sheets()[0]              # 通过索引顺序获取（0是第一个sheet） 
the_sheet = data.sheet_by_index(0)        # 通过索引顺序获取，同上 
the_sheet = data.sheet_by_name(u'Sheet1') # 通过名称获取

# 获取数据，返回值为list
data_list.row_values(1) # 第二行数据（支持负索引取值）
data_list.col_values(1) # 第二列数据

# 获得行数和列数。
rows = the_sheet.nrows # 行数
cols = the_sheet.ncols # 列数
# 输出每一行数据
for i in range(rows):
    print(the_sheet.row_values(i))

# 获得指定单元格数据的三种方式
data = the_sheet.cell(0,0).value # 第一行第一列的值
data = the_sheet.row(0)[0].value # 第一行第一列
data = the_sheet.col(0)[0].value # 第一列第一行

data = the_sheet.cell(0,0).xf_index # 第一行第一列的背景色
data = the_sheet.row(0)[0].xf_index # 第一行第一列的背景色
data = the_sheet.col(0)[0].xf_index # 第一列第一行的背景色
```



**修改excel**


```
row=0 # 修改第一行
col=0 # 修改第一列

# ctype: 0-->empty,1-->string,2-->number,3-->date,4-->boolean,5-->error
cell_type=1 # 修改类型
value='你说你不懂我为何在这时牵手' # 修改内容

cell_A1=the_sheet.cell(0,0).value # 获取第一行第一列的值

format=0

the_sheet.put_cell(row, col, cell_type, value, format) # 修改操作

cell_A1=the_sheet.cell(0,0).value # 再看一下，值已被改
```



**其他**


```python
import xlrd
from flask import Flask, jsonify, request

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False

@app.route('/ttt', methods=['POST'])
def ttt():
    filestorage = request.files.get('upload')
    print(filestorage)
    f = filestorage.read()
    workbook = xlrd.open_workbook(file_contents=f)
    sheet2 = workbook.sheet_by_index(0)
    rows = sheet2.nrows  # 行数
    cols = sheet2.ncols  # 列数
    print(rows, cols)

    for i in range(rows):
        print(sheet2.row_values(i))

    return 'ttt'

if __name__ == '__main__':
    app.run( host='0.0.0.0')
```

在flask中，不经过磁盘IO直接读取前端传的.xls文件

### **xlutils 追写 Excel**

　　xlwt 只能创建一个全新的 Excel 文件，然后对这个文件进行写入内容以及保存。

　　但是大多数情况下需求会是读入一个 Excel 文件，然后进行修改或追加，这个时候，就决定用你了—— xlutils 。

下面的 demo 是给一个 Excel 文件追加内容：


```
from xlrd import open_workbook
from xlutils.copy import copy

# 用 xlrd 提供的方法读取一个excel文件
rexcel = open_workbook("ttt.xls",formatting_info=True) # 保留原有样式
# 用 xlrd 提供的方法获得现在已有的行数
rows = rexcel.sheets()[0].nrows 
# 用 xlutils 提供的copy方法将 xlrd 的对象转化为 xlwt 的对象
excel = copy(rexcel) 
# 用 xlwt 对象的方法获得要操作的 sheet
table = excel.get_sheet(0) 
values = ["1", "2", "3"]
row = rows
for value in values:
    table.write(row, 0, value) # xlwt对象的写方法，参数分别是行、列、值
    table.write(row, 1, "haha")
    table.write(row, 2, "lala")
    row += 1
excel.save("ttt.xls") # xlwt 对象的保存方法，这时便覆盖掉了原来的 Excel
```


### openpyxl 模块

　　openpyxl 模块是一个读写 Excel 2010 文档的 Python 库，不支持更早格式的 Excel，openpyxl 模块支持同时读取和修改Excel文档。

　　openpyxl 模块默认可读可写，若只需要读或者写的功能，可以在 open 时指定 write\_only 或 read\_only 为 True

　　openpyxl 模块中有三个不同层次的类，Workbook 是对工作簿的抽象，Worksheet 是对表格的抽象，Cell 是对单元格的抽象，每一个类都包含了许多属性和方法。

注：openpyxl 只能操作 .xlsx，若需要插入图片需要安装 pillow 库

**打开 Excel 文件**

-   **读取已存在的 Excel 文件**
-   **新建 Excel 工作簿**



```python
import openpyxl

# 打开已有的 .xlsx
data = openpyxl.load_workbook('xxx.xlsx') # 可读可写
data = openpyxl.load_workbook('xxx.xlsx', read_only=True) # 只读
data = openpyxl.load_workbook('xxx.xlsx', write_only=True) # 只写

# 创建一个新的 .xlsx
wb = openpyxl.Workbook()
# ...
wb.save('xxxxxxx.xlsx') # 保存
```



**创建 sheet 并写入值**

-   **获取sheet**
-   **创建sheet**
-   **删除sheet**
-   **复制sheet**
-   **获取sheet的属性：标题、大小、最大行 / 列、最小行 / 列、数据**



```python
import openpyxl
import datetime
import time

wb = openpyxl.Workbook() #创建一个空的 Excel 工作簿

# ----------操作 sheet
ws = wb.active #获取第一个sheet
ws1 = wb.create_sheet("sheet1") #创建一个名为sheet1的sheet
ws1.title = "New Title" #设定sheet的名字
ws1.sheet_properties.tabColor = "1072BA" #设定sheet标签的背景颜色
ws2 = wb.create_sheet("sheet2", 0) #创建一个sheet并设定插入位置，默认插在后面
ws2.title = u"夜的第七章" #sheet的名字必须是Unicode

# ----------在指定单元格写入值
ws['A1'] = 1980      #写入数字
ws['B1'] = "你是我的"+"OK绷" #写入中文（unicode中文也可）
ws.append([1, 2, 3])  #批量写入多个单元格
ws['A2'] = datetime.datetime.now() #写入一个当前时间
ws['A3'] =time.strftime("%Y-%m-%d %H:%M:%S",time.localtime()) #写入一个自定义的时间格式

# ----------获取全部sheet的名字，遍历sheet名字
print(wb.sheetnames)
for sheet_name in wb.sheetnames:
    print(sheet_name)

for sheet in wb:
    print sheet.title

# ----------获取指定sheet对象
print(wb.get_sheet_by_name(u"夜的第七章"  ))
print(wb["New Title" ])

# ----------复制一个sheet
w3 = wb.copy_worksheet(wb['new title'])
ws3.title = 'new2'

# ----------删除一个sheet
wb.remove_sheet(wb['new title'])

# ----------sheet对象的各种属性
print(ws.title) # 表格的标题
print(ws.dimensions) # 表格的大小，指含有数据的表格的大小，即：左上角的坐标:右下角的坐标
print(ws.max_row) # 表格的最大行
print(ws.min_row) #表格的最小行
print(ws.max_column) # 表格的最大列
print(ws.min_column) # 表格的最小列
print(ws.rows) # 按行获取单元格(Cell对象) - 生成器
print(ws.columns) # 按列获取单元格(Cell对象) - 生成器
print(ws.values) # 按行获取表格的内容(数据) - 生成器

# 保存
wb.save("ttt.xlsx")
```

View Code

**操作单元格**

-   **获取单元格属性**
-   **在指定单元格插入数据**
-   **查看单元格类型**
-   **使用公式**
-   **合并、拆分单元格**
-   **隐藏单元格**
-   **操作多行、多列**



```python
import openpyxl

wb = Workbook()
ws1 = wb.create_sheet("sheet1")

# ----------获取单元格指定属性
print(ws1.cell(row=1,column=2).row) # 单元格所在的行
print(ws1.cell(row=1,column=2).column) # 单元格坐在的列
print(ws1.cell(row=1,column=2).value) # 单元格的值
print(ws1.cell(row=1,column=2).coordinate) # 单元格的坐标

# ----------在指定单元格插入数据
ws1["A1"] = '久未放晴的天空'
ws1["A2"] = '依旧留着你的笑容'
ws1["A3"] = '哭过却又无法掩埋歉疚'
ws1["B1"] = 123
ws1["B2"] = 456
ws1["B3"] = 789
ws1["C2"] = time.strftime("%Y年%m月%d日 %H时%M分%S秒",time.localtime())
d = ws1.cell(row=4, column=3, value=10)

# ----------存入百分数
ws1["D1"]="12%" # 存入百分数，其实是小数
print(ws1["D1"].value) # 0.12
# 正确方法
wb.guess_types = False
ws1["D2"]="12%"
print(ws1["D2"].value) # 12%

# ----------查看单元格类型
print(ws1["A1"].number_format) # General
print(ws1["B1"].number_format) # General
print(ws1["C2"].number_format) # yyyy-mm-dd h:mm:ss
print(ws1["D1"].number_format) # 0.00_ 
print(ws1["D2"].number_format) # 0%
# 数字需要在Excel中设置数字类型guess_types=True，直接写入的数字是常规类型

# ----------使用公式
ws1["B4"] = "=SUM(1, 1)"
ws1["B5"] = "=SUM(B1:B3)"
prit(ws1["B4"]) # 打印的是公式内容，不是公式计算后的值,程序无法取到计算后的值

# ----------合并单元格
ws.merge_cells('E2:J2')
ws.merge_cells(start_row=2,start_column=1,end_row=2,end_column=4)

# ----------拆分单元格
# 针对本来就合并的单元格，不能直接执行拆分，需要先执行合并再执行拆分
ws.unmerge_cells('E2:J2') 
ws.unmerge_cells(start_row=2,start_column=1,end_row=2,end_column=4)

# ----------隐藏单元格
ws1.column_dimensions.group('A', 'D', hidden=True)   #隐藏a到d列范围内的列

# ----------获取单列的值
print(ws1["A"]) # 元祖 
for cell in ws1["A"]:
    print(cell.value) 

# ----------操作多列,获取每一个值
print(ws1["A:C"]) # 获取A到C列，元祖套元祖
for column in ws1["A:C"]:
    for cell in column:
        print(cell.value)

for row in ws1.iter_rows(min_row=1, min_col=1, max_col=3, max_row=3):
    for cell in row:
        print(cell.value)

# ----------获取所有行
prin(ws1.rows)
for row in ws1.rows:
    print(row)

# ----------获取所有列
prin(ws1.columns)
for col in ws1.columns:
    print(col)

wb.save("ttt.xlsx")
```

View Code

**获取行对象、列对象**

-   **获取指定行 / 列的值**



```
import openpyxl

wb = openpyxl.load_workbook('e:\\sample.xlsx')
ws = wb.active
rows = []
for row in ws.iter_rows():
    rows.append(row)

cols = []
for col in ws.iter_cols():
    cols.append(col)

# 行、列同理
print(rows) #所有行
print(rows[0]) #获取第一行
print(rows[0][0]) #获取第一行第一列的单元格对象
print(rows[0][0].value) #获取第一行第一列的单元格对象的值
print(rows[-1] ) #获取最后行 print rows[-1]
print(rows[len(rows)-1][len(rows[0])-1]) #获取第后一行和最后一列的单元格对象
print(rows[len(rows)-1][len(rows[0])-1].value) #获取第后一行和最后一列的单元格对象的值
```

View Code

**设定指定区域表格的样式**



```python
# -*- coding: utf-8 -*-
from openpyxl import load_workbook
from openpyxl import Workbook
from openpyxl.worksheet.table import Table, TableStyleInfo

wb = Workbook()
ws = wb.active

data = [
    ['Apples', 10000, 5000, 8000, 6000],
    ['Pears',   2000, 3000, 4000, 5000],
    ['Bananas', 6000, 6000, 6500, 6000],
    ['Oranges',  500,  300,  200,  700],
]

# 表头，必须是string
ws.append(["Fruit", "2011", "2012", "2013", "2014"])
for row in data:
    ws.append(row)

tab = Table(displayName="Table1", ref="A1:E5")

# 是否隔行换色，是否隔列换色
style = TableStyleInfo(name="TableStyleMedium9", showFirstColumn=True,
                       showLastColumn=True, showRowStripes=True, showColumnStripes=True)

tab.tableStyleInfo = style
ws.add_table(tab)

wb.save("ttt.xlsx")
```

View Code

**设定字体样式**

-   **设定字体**
-   **设定对齐方式**
-   **设定是否加锁、是否隐藏**
-   **设定行 / 列的字体**



```
# -*- coding: utf-8 -*-
from openpyxl import Workbook
from openpyxl.styles import colors
from openpyxl.styles import Font
from copy import copy

wb = Workbook()
ws = wb.active

a1 = ws['A1']
d4 = ws['D4']

# ----------设定字体
ft = Font(color=colors.RED, # 设定颜色，也可以用颜色编码如color="FFBB00"
          name=u'宋体', # 设定字体
          size=14, # 设定字体大小
          italic=True, # 倾斜字体
          bold=True, # 设定粗体
          underline="single" # 设定下划线
               ) 
a1.font = ft
d4.font = ft

# ----------设定对齐方式
alignment=Alignment(horizontal='general',
                    vertical='bottom',
                    text_rotation=0,
                    wrap_text=False,
                    shrink_to_fit=False,
                    indent=0)
a1.alignment = alignment
d4.alignment = alignment

# ----------设定加锁或隐藏
protection = Protection(locked=True,
                        hidden=False)


# ----------设定行和列的字体
col = ws.column_dimensions['B']
col.font = ft
row = ws.row_dimensions[1]
row.font = Font(underline="single") #将第一行设定为下划线格式

wb.save("ttt.xlsx")
```

View Code

**设定单元格样式**

-   **设定单元格背景色**
-   **设定单元格边框**



```
# -*- coding: utf-8 -*-
from openpyxl import Workbook
from openpyxl.styles import Font
from openpyxl.styles import NamedStyle, Font, Border, Side,PatternFill, colors

wb = Workbook()
ws = wb.active

highlight = NamedStyle(name="highlight")
highlight.font = Font(bold=True, size=20,color= "ff0100")
highlight.fill = PatternFill("solid", fgColor="DDDDDD") # 背景色
bd = Side(style='thick',  # 'hair', 'medium', 'dashDot', 'dotted', 'mediumDashDot', 'dashed', 'mediumDashed', 'mediumDashDotDot', 'dashDotDot', 'slantDashDot', 'double', 'thick', 'thin'
          color="000000",
          )
highlight.border = Border(left=bd, top=bd, right=bd, bottom=bd)

print(dir(ws["A1"]))
ws["A1"].style =highlight

# 单独设定单元格的背景色样式
sht["A1"] = "故事的小黄花"
sht["A3"] = "从出生那年就飘着"
sht["A5"] = "童年的荡秋千"
sht["A7"] = "随记忆一直摇到现在"

fill_1 = PatternFill("solid", fgColor="1874CD") # 蓝色
fill_2 = PatternFill("solid", fgColor="BCEE68") # 绿色
fill_3 = PatternFill("solid", fgColor=colors.RED) # 红色
fill_4 = PatternFill("lightVertical", fgColor=colors.GREEN) # 虚线背景色

sht["A1"].fill = fill_1
sht["A3"].fill = fill_2
sht["A5"].fill = fill_3
sht["A7"].fill = fill_4

wb.save("ttt.xlsx")
```

View Code

**插入图片**

　　需要先安装Pilow



```
# -*- coding: utf-8 -*-
from openpyxl import load_workbook
from openpyxl.drawing.image import Image

wb = load_workbook('ttt.xlsx')
ws1 = wb.active

img = Image('ttt.png')
ws1.add_image(img, 'A1')

wb.save("ttt.xlsx")
```


**插入饼图**



```
# -*- coding: utf-8 -*-
from openpyxl import load_workbook
from openpyxl import Workbook
from openpyxl.chart import (PieChart , ProjectedPieChart, Reference)
from openpyxl.chart.series import DataPoint

data = [
    ['Pie', 'Sold'],
    ['Apple', 50],
    ['Cherry', 30],
    ['Pumpkin', 10],
    ['Chocolate', 40],
]

wb = Workbook()
ws = wb.active

for row in data:
    ws.append(row)

pie = PieChart()
labels = Reference(ws, min_col=1, min_row=2, max_row=5)
data = Reference(ws, min_col=2, min_row=1, max_row=5)
pie.add_data(data, titles_from_data=True)
pie.set_categories(labels)
pie.title = "Pies sold by category"

# Cut the first slice out of the pie
slice = DataPoint(idx=0, explosion=20)
pie.series[0].data_points = [slice]

ws.add_chart(pie, "D1")

ws = wb.create_sheet(title="Projection")

data = [
    ['Page', 'Views'],
    ['Search', 95],
    ['Products', 4],
    ['Offers', 0.5],
    ['Sales', 0.5],
]

for row in data:
    ws.append(row)

projected_pie = ProjectedPieChart()
projected_pie.type = "pie"
projected_pie.splitType = "val" # split by value
labels = Reference(ws, min_col=1, min_row=2, max_row=5)
data = Reference(ws, min_col=2, min_row=1, max_row=5)
projected_pie.add_data(data, titles_from_data=True)
projected_pie.set_categories(labels)

ws.add_chart(projected_pie, "A10")

from copy import deepcopy
projected_bar = deepcopy(projected_pie)
projected_bar.type = "bar"
projected_bar.splitType = 'pos' # split by position

ws.add_chart(projected_bar, "A27")

# Save the file
wb.save("ttt.xlsx")
```


 参考：_[https://www.cnblogs.com/zeke-python-road/p/8986318.html](https://www.cnblogs.com/zeke-python-road/p/8986318.html)_ 
