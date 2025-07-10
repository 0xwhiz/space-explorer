import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { Calendar, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import 'react-datepicker/dist/react-datepicker.css';
import './date-picker.css';

interface DateInputProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  className?: string;
  maxDate?: Date;
  minDate?: Date;
  disabled?: boolean;
}

const DateInput = React.forwardRef<HTMLDivElement, DateInputProps>(
  ({ selected, onChange, placeholder = "Select date", className, maxDate, minDate, disabled }, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    const formatDate = (date: Date | null) => {
      if (!date) return '';
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    };

    return (
      <div ref={ref} className={cn("relative z-50", className)}>
        <DatePicker
          selected={selected}
          onChange={(date: Date | null) => {
            onChange(date);
            setIsOpen(false);
          }}
          onCalendarOpen={() => setIsOpen(true)}
          onCalendarClose={() => setIsOpen(false)}
          placeholderText={placeholder}
          maxDate={maxDate}
          minDate={minDate}
          disabled={disabled}
          dateFormat="yyyy-MM-dd"
          popperClassName="modern-datepicker-popper"
          popperPlacement="bottom-start"
          showPopperArrow={false}
          open={isOpen}
          onClickOutside={() => setIsOpen(false)}

          customInput={
            <button
              type="button"
              className={cn(
                "flex items-center justify-between w-full h-10 px-3 py-2",
                "bg-background/50 backdrop-blur-sm border border-border/50",
                "rounded-md text-left text-sm font-medium",
                "transition-all duration-200 ease-out",
                "hover:bg-background/70 hover:border-border",
                "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
                "disabled:cursor-not-allowed disabled:opacity-50",
                "group"
              )}
              onClick={() => !disabled && setIsOpen(!isOpen)}
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg text-primary">
                  <Calendar className="w-4 h-4" />
                </div>
                <span className={cn(
                  "transition-colors duration-200",
                  selected ? "text-foreground" : "text-muted-foreground"
                )}>
                  {selected ? formatDate(selected) : placeholder}
                </span>
              </div>
              <ChevronDown 
                className={cn(
                  "w-4 h-4 ml-4 text-muted-foreground transition-transform duration-200",
                  isOpen && "rotate-180"
                )} 
              />
            </button>
          }
        />
      </div>
    );
  }
);

DateInput.displayName = "DateInput";

export { DateInput }; 