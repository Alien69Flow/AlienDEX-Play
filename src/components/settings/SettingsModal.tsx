import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Globe, Moon, Sun, Volume2, VolumeX, Bell, BellOff } from "lucide-react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  const [language, setLanguage] = useState("en");
  const [darkMode, setDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [slippage, setSlippage] = useState("0.5");

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "ja", name: "日本語", flag: "🇯🇵" },
    { code: "ko", name: "한국어", flag: "🇰🇷" },
    { code: "zh", name: "中文", flag: "🇨🇳" },
    { code: "ru", name: "Русский", flag: "🇷🇺" },
  ];

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    // Here you would implement actual translation logic
    console.log(`Language changed to: ${newLanguage}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-card border-primary/30 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground flex items-center gap-2">
            <Globe className="w-6 h-6 text-primary" />
            Settings & Language
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Language Settings */}
          <div className="space-y-4">
            <Label className="text-lg font-semibold text-foreground">Language / Idioma</Label>
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-full bg-muted/50 border-primary/30">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-primary/30 backdrop-blur-xl">
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    <div className="flex items-center gap-2">
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator className="bg-border" />

          {/* Trading Settings */}
          <div className="space-y-4">
            <Label className="text-lg font-semibold text-foreground">Trading Settings</Label>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm">Default Slippage Tolerance</Label>
                <Select value={slippage} onValueChange={setSlippage}>
                  <SelectTrigger className="w-32 bg-muted/50 border-primary/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-primary/30">
                    <SelectItem value="0.1">0.1%</SelectItem>
                    <SelectItem value="0.5">0.5%</SelectItem>
                    <SelectItem value="1.0">1.0%</SelectItem>
                    <SelectItem value="2.0">2.0%</SelectItem>
                    <SelectItem value="5.0">5.0%</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Separator className="bg-border" />

          {/* Interface Settings */}
          <div className="space-y-4">
            <Label className="text-lg font-semibold text-foreground">Interface</Label>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                  <Label className="text-sm">Dark Mode</Label>
                </div>
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  <Label className="text-sm">Sound Effects</Label>
                </div>
                <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {notificationsEnabled ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
                  <Label className="text-sm">Push Notifications</Label>
                </div>
                <Switch checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
              </div>
            </div>
          </div>

          <Separator className="bg-border" />

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button onClick={onClose} className="flex-1 bg-primary hover:bg-primary/90">
              Save Settings
            </Button>
            <Button onClick={onClose} variant="outline" className="flex-1 border-primary/30">
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;