# Creating database
1. You need to install the ef tool
```bash
dotnet tool install --global dotnet-ef
```
2. Apply all existing migrations with:
```bash
dotnet ef database update
```

# Running EF commands
To run entity framework commands, you need to install the tool:
```bash
dotnet tool install --global dotnet-ef
```

Now you can make migrations (usually done after making changes to models):
```bash
dotnet ef migrations add
```

And apply them to your database:
```bash
dotnet ef database update
```

# Datasamples
You can generate your own datasamples or use pre-made ones.
## generator.py
The generator/generator.py script is self descriptive, just run it and it will show you its help. Feel free to add changes to the source code, e.g. to tweak random generated values bounds.

## Pre-made datasamples
In case you are comfortable with pre-made datasamples, you can simply copy the relevant *.db file to the c# project root directory (where EcoStepBackend.csproj sits) and rename it to 'main.db', and now it becomes you project database (yeah, things are simple with sqlite). You can also find SQL scripts that were used to make those .db files; these scripts, in turn, had been created with generator.py.

Names of these .db files are straightforward: '5 users 1 survey each' means that 5 users were created with 1 survery per each user.