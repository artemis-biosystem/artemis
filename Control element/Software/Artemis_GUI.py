import tkinter as tk
from tkinter import ttk, scrolledtext
import json
import serial
import threading


parameters_explanation = {
    'enable':'1 to enable the module - 0 to disable',
    'time_on': 'Time the module is powered on - in miliseconds',
    'time_off': 'Time the module is powered off - in miliseconds',
    'threshold': 'Load cell threshold to activate the piston pump',
    'speed': 'Speed of the module - percentage of maximum speed (0-100)',
    'max_step': 'Amplitude of the step',
    'intensity': 'Intensity of the module - percentage of max intensity (0-100)',
    'direction': 'Direction of the module - 0 clockwise, 1 anticlockwise',
    'angle': 'Angle of the module (0-180)'
}


class ESP32ControlGUI:
    def __init__(self, master):
        # Initialize the main GUI window
        self.master = master
        master.title("ESP32 Control Panel")
        master.geometry("800x600")  # Set the size of the window

        # Serial connection settings (update this port to match your setup)
        self.serial_port = '/dev/cu.usbserial-0001'  # <-- Change this to match your ESP32's serial port
        self.baud_rate = 115200
        self.ser = None  # Initialize the serial connection as None

        # Call function to create the GUI components
        self.create_widgets()
        # Establish the serial connection
        self.connect_serial()

    def create_widgets(self):
        # Create a notebook widget which will hold the tabs
        self.notebook = ttk.Notebook(self.master)
        self.notebook.pack(expand=True, fill='both')  # Allow the notebook to expand and fill the window

        # Dictionary to hold frames for each module and their corresponding variables
        self.module_frames = {}
        self.module_vars = {}

        # Load configuration from a JSON file
        with open('config.json', 'r') as f:
            self.config = json.load(f)

        # Create a tab for each module in the config
        for module, params in self.config.items():
            # Create a frame for each module's tab
            frame = ttk.Frame(self.notebook)
            self.notebook.add(frame, text=module)  # <-- This is where you can change the appearance of the tabs (font, style, etc.)
            self.module_frames[module] = frame
            self.module_vars[module] = {}

            # Create a row for each parameter in the module
            for i, (param, value) in enumerate(params.items()):
                print(i)
                print(param)
                print(value)
                # Label for the parameter
                label = ttk.Label(frame, text=param)
                label.grid(row=i, column=0, padx=5, pady=5, sticky='e')

                # Different types of input widgets based on the parameter type
                if isinstance(value, bool):
                    var = tk.BooleanVar(value=value)
                    widget = ttk.Checkbutton(frame, variable=var)
                elif isinstance(value, int):
                    var = tk.IntVar(value=value)
                    widget = ttk.Entry(frame, textvariable=var)
                else:
                    var = tk.StringVar(value=str(value))
                    widget = ttk.Entry(frame, textvariable=var)

                widget.grid(row=i, column=1, padx=5, pady=5, sticky='w')
                self.module_vars[module][param] = var

                # Add a label or text to provide explanation for each parameter (optional)
                explanation_label = ttk.Label(frame, text=parameters_explanation[param])  # <-- Add explanations here
                explanation_label.grid(row=i, column=2, padx=5, pady=5, sticky='w')

        # Button to send JSON data to the ESP32
        self.send_button = ttk.Button(self.master, text="Send JSON", command=self.send_json)  # <-- This button triggers the send_json function
        self.send_button.pack(pady=10)

        # Scrolled text area to display serial output
        self.serial_output = scrolledtext.ScrolledText(self.master, height=10)
        self.serial_output.pack(expand=True, fill='both', padx=10, pady=10)

    def connect_serial(self):
        # Attempt to connect to the serial port
        try:
            self.ser = serial.Serial(self.serial_port, self.baud_rate, timeout=1)  # <-- Serial connection setup
            print(f"Connected to {self.serial_port}")
            # Start a new thread to read from the serial port without blocking the main thread
            threading.Thread(target=self.read_serial, daemon=True).start()
        except serial.SerialException as e:
            print(f"Failed to connect to serial port: {e}")

    def read_serial(self):
        # Continuously read from the serial port
        while True:
            if self.ser and self.ser.in_waiting:
                try:
                    # Read and decode a line from the serial port
                    line = self.ser.readline().decode('utf-8').strip()
                    self.serial_output.insert(tk.END, line + '\n')  # Append the line to the serial output area
                    self.serial_output.see(tk.END)  # Scroll to the end to show the latest output

                    # Attempt to parse the received data as JSON
                    try:
                        received_json = json.loads(line)
                        self.update_gui_from_json(received_json)  # <-- Update the GUI based on received JSON data
                    except json.JSONDecodeError:
                        pass  # If the data is not JSON, continue displaying as regular serial output
                except UnicodeDecodeError:
                    print("Received data couldn't be decoded")

    def send_json(self):
        # Prepare the data to be sent as JSON
        json_data = {}
        for module, params in self.module_vars.items():
            # Gather the current values from the GUI
            json_data[module] = {param: var.get() for param, var in params.items()}

        json_string = json.dumps(json_data)  # Convert the data to a JSON string
        if self.ser:
            self.ser.write((json_string + '\n').encode('utf-8'))  # <-- This is where the JSON data is sent through the serial connection
            print(f"Sent: {json_string}")

    def update_gui_from_json(self, received_json):
        # Update the GUI elements based on the received JSON data
        for module, params in received_json.items():
            if module in self.module_vars:
                for param, value in params.items():
                    if param in self.module_vars[module]:
                        self.module_vars[module][param].set(value)  # Set the value in the GUI to match the received data

if __name__ == "__main__":
    root = tk.Tk()
    app = ESP32ControlGUI(root)
    root.mainloop()